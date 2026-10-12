import React, { useEffect } from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 md:p-8 pt-24 sm:pt-24 pb-4 sm:pb-8 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[calc(100vh-6.5rem)] sm:max-h-[calc(100vh-7.5rem)] flex flex-col shadow-2xl border border-slate-200/90 relative animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0 bg-white">
          <div>
            <div className="flex items-center gap-2 text-teal-700 mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">YNM Enterprises Policy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              B2B Privacy &amp; Inquiry Handling Policy
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain flex-1 space-y-4 text-sm text-slate-600 leading-relaxed font-normal">
          <p>
            At YNM Enterprises, we value the confidentiality of our business partners, distributors, and wholesale purchasers. Information submitted through our wholesale quotation forms is used solely to evaluate your business inquiry, prepare formal pricing terms, and coordinate supply logistics.
          </p>

          <h4 className="font-bold text-slate-800 text-sm mt-3">Data Collection &amp; Use</h4>
          <p>
            We collect only the business contact details provided by you (Full Name, Business Email Address, WhatsApp / Phone number, and specific quantity requirements). We do not share, sell, or rent your contact details to third-party marketing companies.
          </p>

          <h4 className="font-bold text-slate-800 text-sm mt-3">Email &amp; Messaging Delivery</h4>
          <p>
            Inquiries are securely dispatched directly to our business headquarters at <strong>ynmenterprises789@gmail.com</strong> and coordinated via our WhatsApp line (+92 306 3846729).
          </p>

          <h4 className="font-bold text-slate-800 text-sm mt-3">Direct Contact</h4>
          <p>
            For any queries regarding commercial data handling or wholesale terms, contact:
            <br />
            <strong>Abdul Waheed</strong> &mdash; YNM Enterprises, Karachi, Pakistan.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex justify-end shrink-0 bg-slate-50/70">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-teal-700 transition-colors"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
