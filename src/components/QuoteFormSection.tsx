import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, ShieldCheck, RefreshCw } from 'lucide-react';
import { InquiryFormData, InquiryResponse } from '../types';

interface QuoteFormSectionProps {
  selectedProduct: string;
  onClearSelectedProduct: () => void;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({
  selectedProduct,
  onClearSelectedProduct,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    businessEmail: '',
    phone: '',
    product: selectedProduct || 'Releaf Party Pack Pink',
    quantity: '',
    message: '',
    website_bot_trap: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<InquiryResponse | null>(null);

  // Keep form in sync when user clicks "Request Bulk Quote" from any product card
  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        product: selectedProduct,
      }));
    }
  }, [selectedProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.businessEmail.trim())) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your WhatsApp / contact number.');
      return;
    }
    const qty = Number(formData.quantity);
    if (!formData.quantity || isNaN(qty) || qty <= 0) {
      setErrorMsg('Please enter a valid numeric required quantity (e.g. 50 or 200).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: InquiryResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      setSuccessResponse(data);
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMsg(err.message || 'Unable to submit inquiry at this moment. Please check your network or contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessResponse(null);
    setFormData({
      fullName: '',
      businessEmail: '',
      phone: '',
      product: 'Releaf Party Pack Pink',
      quantity: '',
      message: '',
      website_bot_trap: '',
    });
    onClearSelectedProduct();
  };

  return (
    <section id="quote-form" className="py-20 md:py-28 relative bg-white/75 border-t border-slate-200/80 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Direct B2B Procurement Inquiry &middot; Karachi Office
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Request a Bulk Quote
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-pretty">
            Specify your product requirements and estimated volume below. Our sales team directly reviews every inquiry and delivers formal pricing terms to your business.
          </p>
        </div>

        {/* Form Card or Success State */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl relative overflow-hidden">
          
          {successResponse ? (
            /* Submission Success State (Shown ONLY after backend acceptance) */
            <div className="text-center py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-center text-teal-600 mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Inquiry Submitted Successfully
                </h3>
                <p className="text-base text-slate-600 max-w-xl mx-auto">
                  Thank you for contacting YNM Enterprises. Your inquiry has been submitted successfully.
                </p>
              </div>

              {/* Reference Details Box */}
              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-3">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Reference Code:</span>
                  <span className="font-bold text-teal-800 tabular-nums text-sm">
                    {successResponse.referenceNumber}
                  </span>
                </div>
                {successResponse.details && (
                  <>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Selected Product:</span>
                      <span className="font-semibold text-slate-800">{successResponse.details.product}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Required Quantity:</span>
                      <span className="font-semibold text-slate-800 tabular-nums">{successResponse.details.quantity}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Dispatched To:</span>
                      <span className="font-medium text-slate-700">{successResponse.details.recipient}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200">
                      <span className="text-slate-500">Timestamp (PKT):</span>
                      <span className="text-slate-700 text-[11px]">{successResponse.details.timestamp}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={`https://wa.me/923063846729?text=Hello%20YNM%20Enterprises,%20I%20have%20submitted%20bulk%20inquiry%20${encodeURIComponent(
                    successResponse.referenceNumber || ''
                  )}%20and%20would%20like%20to%20follow%20up.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>Follow Up Instantly via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Submit Another Bulk Inquiry</span>
                </button>
              </div>
            </div>
          ) : (
            /* Active Form Inputs */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Bot Honeypot (Hidden) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_bot_trap">Do not fill this field</label>
                <input
                  type="text"
                  id="website_bot_trap"
                  name="website_bot_trap"
                  tabIndex={-1}
                  value={formData.website_bot_trap}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>{errorMsg}</div>
                </div>
              )}

              {/* Row 1: Full Name & Business Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Full Name <span className="text-teal-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label htmlFor="businessEmail" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Business Email Address <span className="text-teal-700">*</span>
                  </label>
                  <input
                    type="email"
                    id="businessEmail"
                    name="businessEmail"
                    required
                    value={formData.businessEmail}
                    onChange={handleChange}
                    placeholder="e.g. procurement@company.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Row 2: WhatsApp Number & Product */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    WhatsApp / Contact Number <span className="text-teal-700">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label htmlFor="product" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Product of Interest <span className="text-teal-700">*</span>
                  </label>
                  <select
                    id="product"
                    name="product"
                    required
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                  >
                    <option value="Releaf Party Pack Pink">Releaf Party Pack Pink</option>
                    <option value="Releaf Party Pack White">Releaf Party Pack White</option>
                    <option value="Releaf Maxsoft 10 Rolls">Releaf Maxsoft 10 Rolls</option>
                    <option value="Multiple Products">Multiple Products</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Required Quantity (NO quantity unit field) */}
              <div>
                <label htmlFor="quantity" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Required Quantity <span className="text-teal-700">*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  required
                  min="1"
                  step="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity, e.g. 50 or 200"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all placeholder:text-slate-400 tabular-nums"
                />
              </div>

              {/* Optional Field: Additional Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Additional Message <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details on your delivery location, schedule, or packaging preferences..."
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Direct Email Note */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Direct submission to ynmenterprises789@gmail.com</span>
                </div>
                <span>Confidential B2B Inquiry</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 text-sm sm:text-base font-bold text-white bg-slate-900 hover:bg-teal-700 active:bg-teal-800 rounded-xl shadow-md transition-all disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Bulk Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Send Bulk Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
