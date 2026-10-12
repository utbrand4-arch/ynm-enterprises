import React from 'react';
import { ArrowRight, Layers, FileSpreadsheet, Handshake } from 'lucide-react';

interface B2BWholesaleProcessProps {
  onNavigate: (sectionId: string) => void;
}

export const B2BWholesaleProcess: React.FC<B2BWholesaleProcessProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Select Your Product',
      desc: 'Choose between Releaf Party Pack (White or Pink) or Releaf Maxsoft 10-Roll toilet tissue lines depending on your retail or corporate requirement.',
      icon: Layers,
    },
    {
      num: '02',
      title: 'Share Your Bulk Requirement',
      desc: 'Specify your estimated procurement quantity in cartons, packs, or rolls using our clear bulk inquiry form or direct WhatsApp line.',
      icon: FileSpreadsheet,
    },
    {
      num: '03',
      title: 'Discuss Pricing and Supply',
      desc: 'Our Karachi office connects directly with your purchasing representative to discuss volume-tiered pricing, logistics, and dispatch schedules.',
      icon: Handshake,
    },
  ];

  return (
    <section className="py-20 md:py-24 relative bg-slate-50/50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Procurement Process &middot; Transparent &amp; Direct
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Wholesale Tissue Solutions for Business Buyers.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-pretty">
            YNM Enterprises welcomes business inquiries for tissue products and bulk supply requirements. Share your product preference and estimated quantity to discuss suitable supply arrangements.
          </p>
        </div>

        {/* 3 Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative bg-white/95 rounded-2xl p-8 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Editorial Numbering */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-extrabold tracking-tight text-teal-700 tabular-nums">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-800 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-teal-700 transition-colors">
                  <span>Step {step.num} Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900">
              Ready to submit your estimated volume?
            </h4>
            <p className="text-sm text-slate-600">
              Provide your required quantity and packaging preference in under two minutes.
            </p>
          </div>

          <button
            onClick={() => onNavigate('quote-form')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-xl shadow-xs hover:shadow transition-colors shrink-0"
          >
            <span>Discuss Your Requirement</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
