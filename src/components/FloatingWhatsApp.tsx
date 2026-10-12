import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/923063846729?text=Hello%20YNM%20Enterprises,%20I%20would%20like%20to%20discuss%20a%20bulk%20tissue%20product%20inquiry.';

  return (
    <aside
      aria-label="Direct WhatsApp contact"
      className="fixed bottom-6 right-6 z-40 flex items-center group select-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
        title="Chat on WhatsApp (+92 306 3846729)"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white" />
        </div>
        <span className="hidden sm:inline font-medium tracking-tight">
          WhatsApp Inquiry
        </span>
      </a>
    </aside>
  );
};
