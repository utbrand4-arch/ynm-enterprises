import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Info } from 'lucide-react';

interface ProductShowcaseProps {
  onSelectProductForQuote: (productName: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onSelectProductForQuote,
}) => {
  const [selectedProductDetails, setSelectedProductDetails] = useState<any | null>(null);

  useEffect(() => {
    if (selectedProductDetails) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedProductDetails(null);
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProductDetails]);

  const products = [
    {
      id: 'releaf-party-pack-pink',
      name: 'Releaf Party Pack Pink',
      category: 'Facial Tissue / Party Pack',
      image: '/releaf-party-pack-pink.png',
      description:
        'Soft facial tissues in signature blush-pink packaging. Manufactured by YNM Enterprises in Karachi for wholesale retail supply, boutique venues, and beauty salons.',
      specs: {
        packaging: 'Multipurpose dispenser party pack in signature pink finish',
        sheetType: 'Ultra-soft and absorbent virgin fiber ply',
        targetUse: 'Retail wholesale distribution, hospitality suites, commercial stock',
      },
    },
    {
      id: 'releaf-party-pack-white',
      name: 'Releaf Party Pack White',
      category: 'Facial Tissue / Party Pack',
      image: '/releaf-party-pack-white.png',
      description:
        'Premium white multipurpose facial tissues presented in an elegant clean white party pack. Engineered for daily hospitality, office reception, and wholesale grocery supply.',
      specs: {
        packaging: 'Pre-boxed dispenser party pack with pull-tab top opening',
        sheetType: 'Soft and absorbent virgin fiber tissue sheets',
        targetUse: 'Supermarket retail, corporate offices, institutional supply',
      },
    },
    {
      id: 'releaf-10-roll',
      name: 'Releaf Maxsoft 10 Rolls',
      category: 'Bathroom Tissue / Multi-Pack',
      image: '/releaf-10-roll.png',
      description:
        'High-capacity 10-roll bundled multipack of embossed Maxsoft toilet tissue rolls. Designed for economical bulk distribution, institutional buyers, and supermarket supply.',
      specs: {
        packaging: '10-roll bundled economy pack with easy-carry handle',
        sheetType: '2-Ply embossed soft and strong bathroom paper',
        targetUse: 'Commercial facilities, bulk retail wholesalers, institutions',
      },
    },
  ];

  return (
    <section id="products" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Wholesale Catalog &middot; Verified Releaf Line
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Products Available for Bulk Supply
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-pretty">
            Review the primary Releaf tissue range supplied in wholesale volumes by YNM Enterprises. Select any product below to start a customized bulk quotation tailored to your business volume.
          </p>
        </div>

        {/* 3-Column Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="group flex flex-col bg-white/95 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Visual Container */}
              <div className="relative w-full aspect-square bg-gradient-to-b from-slate-50/90 to-white flex items-center justify-center p-6 sm:p-8 overflow-hidden border-b border-slate-100">
                <img
                  src={prod.image}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Category Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs border border-slate-200/70 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  {prod.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {prod.description}
                  </p>
                </div>

                {/* Factual Specs Checklist */}
                <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{prod.specs.packaging}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{prod.specs.sheetType}</span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onSelectProductForQuote(prod.name)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-xl shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                  >
                    <span>Request Bulk Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedProductDetails(prod)}
                    className="p-3 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                    title="View packaging specifications"
                    aria-label={`View ${prod.name} specifications`}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Details Modal */}
        {selectedProductDetails && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 md:p-8 pt-24 sm:pt-24 pb-4 sm:pb-8 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setSelectedProductDetails(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[calc(100vh-6.5rem)] sm:max-h-[calc(100vh-7.5rem)] flex flex-col shadow-2xl border border-slate-200/90 relative animate-in zoom-in-95 duration-200 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0 bg-white">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                    Product Specifications
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mt-1">
                    {selectedProductDetails.name}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedProductDetails(null)}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg text-xl hover:bg-slate-100 transition-colors"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain flex-1 space-y-4">
                <div className="w-48 h-48 mx-auto p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                  <img
                    src={selectedProductDetails.image}
                    alt={selectedProductDetails.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {selectedProductDetails.description}
                </p>
                <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">Format:</span>{' '}
                    <span className="text-slate-600">{selectedProductDetails.specs.packaging}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Quality:</span>{' '}
                    <span className="text-slate-600">{selectedProductDetails.specs.sheetType}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Suitability:</span>{' '}
                    <span className="text-slate-600">{selectedProductDetails.specs.targetUse}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-slate-50/70">
                <button
                  onClick={() => setSelectedProductDetails(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const prodName = selectedProductDetails.name;
                    setSelectedProductDetails(null);
                    onSelectProductForQuote(prodName);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-xl transition-colors"
                >
                  Quote this Product
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
