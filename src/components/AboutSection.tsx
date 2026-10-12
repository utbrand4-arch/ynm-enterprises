import React from 'react';
import { MapPin, User, Building, Mail, Phone, MessageCircle } from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section id="about" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Clean White Card */}
        <div className="relative bg-white/95 rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/90 shadow-sm overflow-hidden">
          
          {/* Subtle Ambient Background Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-50/50 to-transparent rounded-bl-full pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                About YNM Enterprises &middot; Karachi, Pakistan
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance leading-tight">
                Focused on Products. Built for Business Relationships.
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal text-pretty">
                YNM Enterprises is a Karachi-based business focused on tissue products and B2B supply inquiries. We work to make it easier for wholesale buyers and other businesses to discuss their product requirements, estimated quantities, and potential supply arrangements.
              </p>

              {/* Founder / Business Contact Card */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  AW
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">Abdul Waheed</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">
                    Business Contact &mdash; YNM Enterprises
                  </div>
                  <div className="text-xs text-teal-700 font-medium mt-0.5">
                    Karachi, Sindh, Pakistan
                  </div>
                </div>
              </div>

            </div>

            {/* Right Information & Verification Column */}
            <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
              
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-teal-700" />
                <span>Operational Profile</span>
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-teal-600 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Commercial Center</div>
                    <div className="text-slate-600 text-xs mt-0.5">
                      Karachi, Pakistan (Serving local &amp; regional business buyers)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-teal-600 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Official Correspondence</div>
                    <a
                      href="mailto:ynmenterprises789@gmail.com"
                      className="text-teal-700 hover:underline text-xs mt-0.5 block"
                    >
                      ynmenterprises789@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Direct WhatsApp Inquiry</div>
                    <a
                      href="https://wa.me/923063846729"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline text-xs mt-0.5 block"
                    >
                      +92 306 3846729
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <button
                  onClick={() => onNavigate('quote-form')}
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-xl transition-colors text-center"
                >
                  Initiate Bulk Supply Discussion
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
