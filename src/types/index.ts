export interface ProductItem {
  id: string;
  name: string;
  formValue: string;
  category: string;
  defaultImage: string;
  description: string;
  specs: {
    packaging: string;
    sheetType: string;
    targetUse: string;
  };
}

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string[];
}

export interface InquiryFormData {
  fullName: string;
  businessEmail: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
  website_bot_trap?: string;
}

export interface InquiryResponse {
  success: boolean;
  referenceNumber?: string;
  message?: string;
  error?: string;
  details?: {
    product: string;
    quantity: string;
    recipient: string;
    emailSent: boolean;
    referenceNumber: string;
    timestamp: string;
  };
}

export interface SiteMediaConfig {
  logo: string;
  'releaf-party-pack-pink': string;
  'releaf-party-pack-white': string;
  'releaf-10-roll': string;
  customGallery?: Record<string, string[]>;
}
