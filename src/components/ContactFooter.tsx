import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ArrowUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { PrivacyModal } from './PrivacyModal';

interface ContactFooterProps {
  onNavigate: (sectionId: string) => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onNavigate }) => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-24 relative bg-slate-50/60 border-t border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
              Direct Contact &middot; Karachi Office
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
              Get in Touch with YNM Enterprises
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-pretty">
              Whether you are an established retail wholesaler, commercial distributor, or institutional procurement manager, connect directly with our Karachi management.
            </p>
          </div>

          {/* 3 Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Email Card */}
            <a
              href="mailto:ynmenterprises789@gmail.com"
              className="group bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-lg hover:border-teal-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-700 mb-5 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Business Email
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors break-all">
                  ynmenterprises789@gmail.com
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  Send formal RFP documents, specifications, or inquiry details.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
                <span>Compose Email</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/923063846729?text=Hello%20YNM%20Enterprises,%20I%20would%20like%20to%20discuss%20a%20bulk%20tissue%20product%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 mb-5 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  WhatsApp Direct
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  +92 306 3846729
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  Direct mobile chat with business representative Abdul Waheed.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <span>Open WhatsApp Chat</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Headquarters Location Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 mb-5">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Location &amp; Representative
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900">
                  Karachi, Pakistan
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  Contact Person: <strong className="text-slate-800">Abdul Waheed</strong>
                  <br />
                  Business Contact &mdash; YNM Enterprises
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                Operating standard B2B commercial hours
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="relative bg-white/95 border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
            
            {/* Column 1: Brand & Logo Lockup */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/ynm-logo.png"
                  alt="YNM Enterprises"
                  className="w-10 h-10 object-contain rounded-md border border-slate-200"
                />
                <div>
                  <div className="text-lg font-bold text-slate-900">YNM Enterprises</div>
                  <div className="text-xs text-slate-500">B2B Tissue Products &amp; Wholesale Supply</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
                Wholesale supplier of Releaf facial tissues and Maxsoft bathroom tissue products based in Karachi, Pakistan.
              </p>
              <div className="text-xs text-slate-500">
                Contact: <span className="text-slate-800 font-semibold">Abdul Waheed</span> &middot; Karachi, Pakistan
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Navigation
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <button
                    onClick={() => onNavigate('home')}
                    className="hover:text-teal-700 transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('products')}
                    className="hover:text-teal-700 transition-colors"
                  >
                    Products Catalog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('articles')}
                    className="hover:text-teal-700 transition-colors"
                  >
                    Articles &amp; Insights
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('about')}
                    className="hover:text-teal-700 transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="hover:text-teal-700 transition-colors"
                  >
                    Contact Information
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Commercial Links & Legal */}
            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Procurement &amp; Inquiries
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <button
                    onClick={() => onNavigate('quote-form')}
                    className="font-semibold text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-1.5"
                  >
                    <span>Request Bulk Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </li>
                <li>
                  <a
                    href="https://wa.me/923063846729"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 transition-colors"
                  >
                    Direct WhatsApp: +92 306 3846729
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ynmenterprises789@gmail.com"
                    className="hover:text-teal-700 transition-colors"
                  >
                    Email: ynmenterprises789@gmail.com
                  </a>
                </li>
                <li className="pt-2">
                  <button
                    onClick={() => setPrivacyOpen(true)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors"
                  >
                    Privacy Policy &amp; Data Terms
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} YNM Enterprises. All rights reserved. Karachi, Pakistan.
            </p>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
};
