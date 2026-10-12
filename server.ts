import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Support up to 25MB for image uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Directories
const DATA_DIR = path.resolve(process.cwd(), 'data');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const MEDIA_CONFIG_FILE = path.join(DATA_DIR, 'site-media.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(INQUIRIES_FILE)) fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');

const DEFAULT_MEDIA = {
  logo: '/ynm-logo.png',
  'releaf-party-pack-pink': '/releaf party pack pink.png',
  'releaf-party-pack-white': '/releaf party pack white.png',
  'releaf-10-roll': '/releaf 10 roll.png',
  customGallery: {},
};

if (!fs.existsSync(MEDIA_CONFIG_FILE)) {
  fs.writeFileSync(MEDIA_CONFIG_FILE, JSON.stringify(DEFAULT_MEDIA, null, 2), 'utf-8');
}

// Serve public assets and uploaded media directly
app.use(express.static(PUBLIC_DIR));
app.use('/uploads', express.static(UPLOADS_DIR));

interface Inquiry {
  referenceNumber: string;
  fullName: string;
  businessEmail: string;
  phone: string;
  product: string;
  quantity: number;
  message?: string;
  createdAt: string;
  karachiTime: string;
  recipient: string;
  emailSent: boolean;
  emailError?: string;
}

const RECIPIENT_EMAIL = process.env.NOTIFICATION_RECIPIENT || 'ynmenterprises789@gmail.com';

function getKarachiTime(): string {
  try {
    return new Intl.DateTimeFormat('en-PK', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false';

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

// --- Media Management Endpoints ---

app.get('/api/media', (_req: Request, res: Response) => {
  try {
    const raw = fs.readFileSync(MEDIA_CONFIG_FILE, 'utf-8');
    const media = JSON.parse(raw);
    res.json({ success: true, media });
  } catch {
    res.json({ success: true, media: DEFAULT_MEDIA });
  }
});

app.post('/api/media/upload', (req: Request, res: Response): void => {
  try {
    const { slot, dataUrl, fileName } = req.body;

    if (!slot || !dataUrl || typeof dataUrl !== 'string') {
      res.status(400).json({ success: false, error: 'Missing slot or image data' });
      return;
    }

    const matches = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      res.status(400).json({ success: false, error: 'Invalid base64 image data' });
      return;
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    let ext = 'png';
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = 'jpg';
    if (mimeType.includes('webp')) ext = 'webp';

    const safeName = (fileName || 'image')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const savedFileName = `${slot}-${safeName}-${Date.now()}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, savedFileName);

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    const publicUrl = `/uploads/${savedFileName}`;

    // Update persistent media config
    let currentConfig = { ...DEFAULT_MEDIA };
    try {
      const raw = fs.readFileSync(MEDIA_CONFIG_FILE, 'utf-8');
      currentConfig = JSON.parse(raw);
    } catch {
      // Use defaults
    }

    if (slot in currentConfig && slot !== 'customGallery') {
      (currentConfig as any)[slot] = publicUrl;
    } else {
      currentConfig.customGallery = currentConfig.customGallery || {};
      const gallery = (currentConfig.customGallery as any)[slot] || [];
      gallery.unshift(publicUrl);
      (currentConfig.customGallery as any)[slot] = gallery;
    }

    fs.writeFileSync(MEDIA_CONFIG_FILE, JSON.stringify(currentConfig, null, 2), 'utf-8');

    res.json({
      success: true,
      url: publicUrl,
      media: currentConfig,
      message: `Image for ${slot} updated successfully.`,
    });
  } catch (err: any) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to save uploaded image' });
  }
});

app.post('/api/media/reset', (_req: Request, res: Response) => {
  try {
    fs.writeFileSync(MEDIA_CONFIG_FILE, JSON.stringify(DEFAULT_MEDIA, null, 2), 'utf-8');
    res.json({ success: true, media: DEFAULT_MEDIA, message: 'Media restored to default packaging assets' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- Inquiries Endpoints ---

app.get('/api/email-status', (_req: Request, res: Response) => {
  const configured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  res.json({
    configured,
    recipient: RECIPIENT_EMAIL,
    host: process.env.SMTP_HOST ? 'Configured' : 'Not configured (using local persistent inquiry queue)',
    note: configured
      ? 'Direct SMTP automated delivery active to ynmenterprises789@gmail.com'
      : 'Inquiries are safely captured & logged to data/inquiries.json; set SMTP_HOST, SMTP_USER, SMTP_PASS in .env to activate live SMTP transport.',
  });
});

app.get('/api/inquiries', (_req: Request, res: Response) => {
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    const inquiries: Inquiry[] = JSON.parse(raw);
    res.json({ success: true, count: inquiries.length, inquiries: inquiries.slice(-20) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/inquiries', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      fullName,
      businessEmail,
      phone,
      product,
      quantity,
      message,
      website_bot_trap,
    } = req.body;

    if (website_bot_trap) {
      res.json({
        success: true,
        referenceNumber: 'SPAM-DROP',
        message: 'Your inquiry has been submitted successfully.',
      });
      return;
    }

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      res.status(400).json({ success: false, error: 'Please enter your full name.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!businessEmail || !emailRegex.test(String(businessEmail).trim())) {
      res.status(400).json({ success: false, error: 'Please enter a valid business email address.' });
      return;
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 5) {
      res.status(400).json({ success: false, error: 'Please enter a valid WhatsApp / contact number.' });
      return;
    }

    const allowedProducts = [
      'Releaf Party Pack Pink',
      'Releaf Party Pack White',
      'Releaf Maxsoft 10 Rolls',
      'Multiple Products',
    ];

    if (!product || !allowedProducts.includes(product.trim())) {
      res.status(400).json({ success: false, error: 'Please select a valid product of interest.' });
      return;
    }

    const numQty = Number(quantity);
    if (!quantity || isNaN(numQty) || numQty <= 0) {
      res.status(400).json({ success: false, error: 'Please enter a valid required quantity (e.g. 50 or 200).' });
      return;
    }

    const cleanName = fullName.trim();
    const cleanEmail = businessEmail.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanProduct = product.trim();
    const cleanMessage = message && typeof message === 'string' ? message.trim() : '';

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const referenceNumber = `YNM-B2B-${dateCode}-${randomId}`;

    const inquiry: Inquiry = {
      referenceNumber,
      fullName: cleanName,
      businessEmail: cleanEmail,
      phone: cleanPhone,
      product: cleanProduct,
      quantity: numQty,
      message: cleanMessage,
      createdAt: new Date().toISOString(),
      karachiTime: getKarachiTime(),
      recipient: RECIPIENT_EMAIL,
      emailSent: false,
    };

    let emailSent = false;
    let emailError: string | undefined;

    const transporter = getTransporter();

    if (transporter) {
      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #0f172a; padding: 24px; color: #ffffff; border-bottom: 3px solid #0d9488; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 0; font-size: 13px; color: #94a3b8; }
    .content { padding: 24px; }
    .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .table td { padding: 12px 8px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .table td.label { width: 36%; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 11px; }
    .table td.value { color: #0f172a; font-weight: 500; }
    .badge { display: inline-block; padding: 4px 8px; background: #f0fdfa; color: #0f766e; border-radius: 4px; font-weight: 600; font-size: 13px; border: 1px solid #ccfbf1; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-top: 16px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap; }
    .footer { padding: 16px 24px; background: #f8fafc; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>YNM Enterprises — Bulk Supply Inquiry</h1>
      <p>Ref: <strong>${referenceNumber}</strong> &bull; Karachi Time: ${inquiry.karachiTime}</p>
    </div>
    <div class="content">
      <table class="table">
        <tr>
          <td class="label">Reference ID</td>
          <td class="value"><strong>${referenceNumber}</strong></td>
        </tr>
        <tr>
          <td class="label">Full Name</td>
          <td class="value">${cleanName}</td>
        </tr>
        <tr>
          <td class="label">Business Email</td>
          <td class="value"><a href="mailto:${cleanEmail}" style="color: #0d9488; text-decoration: none;">${cleanEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Contact / WhatsApp</td>
          <td class="value"><a href="https://wa.me/${cleanPhone.replace(/[^0-9]/g, '')}" style="color: #0d9488; text-decoration: none;">${cleanPhone}</a></td>
        </tr>
        <tr>
          <td class="label">Product of Interest</td>
          <td class="value"><span class="badge">${cleanProduct}</span></td>
        </tr>
        <tr>
          <td class="label">Required Quantity</td>
          <td class="value"><strong style="font-size: 16px;">${numQty}</strong></td>
        </tr>
      </table>

      ${
        cleanMessage
          ? `
        <div style="margin-top: 20px;">
          <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; margin-bottom: 6px;">Additional Customer Message</div>
          <div class="message-box">${cleanMessage}</div>
        </div>
      `
          : ''
      }
    </div>
    <div class="footer">
      YNM Enterprises &bull; Karachi, Pakistan &bull; Contact: Abdul Waheed &bull; WhatsApp: +92 306 3846729
    </div>
  </div>
</body>
</html>
      `;

      const plainText = `
YNM ENTERPRISES — BULK SUPPLY INQUIRY
-------------------------------------------
Reference Number: ${referenceNumber}
Submission Time (Karachi): ${inquiry.karachiTime}

Customer Name: ${cleanName}
Business Email: ${cleanEmail}
Contact / WhatsApp: ${cleanPhone}
Product: ${cleanProduct}
Required Quantity: ${numQty}

Additional Message:
${cleanMessage || '(None provided)'}

-------------------------------------------
Recipient: ${RECIPIENT_EMAIL}
YNM Enterprises | Karachi, Pakistan
      `.trim();

      try {
        await transporter.sendMail({
          from: `"YNM Enterprises Portal" <${process.env.SMTP_USER}>`,
          to: RECIPIENT_EMAIL,
          subject: `[Bulk Inquiry] ${referenceNumber} — ${cleanName} (${numQty} ${cleanProduct})`,
          text: plainText,
          html: emailHtml,
          replyTo: cleanEmail,
        });
        emailSent = true;
      } catch (err: any) {
        console.error('SMTP Delivery error:', err.message);
        emailError = err.message;
      }
    } else {
      console.log(
        `[YNM Backend] Captured bulk inquiry ${referenceNumber} for ${RECIPIENT_EMAIL}. Logged to data/inquiries.json.`
      );
    }

    inquiry.emailSent = emailSent;
    if (emailError) inquiry.emailError = emailError;

    try {
      const existingRaw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const existing: Inquiry[] = JSON.parse(existingRaw);
      existing.unshift(inquiry);
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
    } catch (saveErr) {
      console.error('Failed to append inquiry to file:', saveErr);
    }

    res.json({
      success: true,
      referenceNumber,
      message: 'Thank you for contacting YNM Enterprises. Your inquiry has been submitted successfully.',
      details: {
        product: cleanProduct,
        quantity: `${numQty}`,
        recipient: RECIPIENT_EMAIL,
        emailSent,
        referenceNumber,
        timestamp: inquiry.karachiTime,
      },
    });
  } catch (error: any) {
    console.error('Inquiry endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your inquiry. Please try again or reach out on WhatsApp.',
    });
  }
});

// Vite or Static Asset Handler
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`YNM Enterprises server running at http://localhost:${PORT}`);
  });
}

startServer();
