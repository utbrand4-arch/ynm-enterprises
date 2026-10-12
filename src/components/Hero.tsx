import React from 'react';
import { ArrowRight, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const heroProducts = [
    {
      name: 'Releaf Party Pack Pink',
      subtitle: 'Soft & Absorbent Multipurpose',
      image: '/releaf-party-pack-pink.png',
      badge: 'Party Pack',
    },
    {
      name: 'Releaf Party Pack White',
      subtitle: 'Premium White Virgin Ply',
      image: '/releaf-party-pack-white.png',
      badge: 'Party Pack',
    },
    {
      name: 'Releaf Maxsoft 10 Rolls',
      subtitle: '2-Ply Embossed Economy Pack',
      image: '/releaf-10-roll.png',
      badge: 'Toilet Tissue',
    },
  ];

  return (
    <section id="home" className="relative pt-8 pb-20 md:pt-16 md:pb-28 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Proposition, Value, & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Domain-clean Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                Karachi Wholesale Hub &middot; Direct B2B Supply
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 text-balance leading-[1.12]">
              B2B Tissue Supply, Built Around Your Business.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl text-pretty font-normal">
              Explore tissue products for wholesale and bulk purchasing through{' '}
              <strong className="font-semibold text-slate-900">YNM Enterprises</strong>, Karachi, Pakistan.
            </p>

            {/* Authentic Procurement Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 w-full max-w-xl">
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Commercial wholesale carton &amp; pack quantities</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Wholesalers, distributors &amp; institutional buyers</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Authentic Releaf consumer &amp; commercial lines</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Direct dispatch from Karachi commercial warehouses</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('quote-form')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-xl shadow-sm hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <span>Request Bulk Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('products')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <span>Explore Products</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Buyer Contact Anchor */}
            <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
              <span>Wholesale Contact: Abdul Waheed</span>
              <span>&middot;</span>
              <span>Karachi, Pakistan</span>
            </div>
          </div>

          {/* Right Column: Authentic Product Visual Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md backdrop-blur-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                    Official Bulk Supply Lines
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    YNM Product Range
                  </h3>
                </div>
                <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                  3 Products
                </span>
              </div>

              {/* 3 Authentic Product Visual Rows */}
              <div className="space-y-4">
                {heroProducts.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigate('products')}
                    className="group flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50/70 hover:bg-teal-50/60 border border-slate-200/80 hover:border-teal-300 transition-all cursor-pointer"
                  >
                    <div className="w-20 h-20 bg-white rounded-xl border border-slate-200/90 p-1.5 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                          {p.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate mt-1 group-hover:text-teal-800 transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {p.subtitle}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                ))}
              </div>

              {/* Quick Prompt to Request Bulk Quote */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Need formal wholesale pricing?</span>
                <button
                  onClick={() => onNavigate('quote-form')}
                  className="font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
