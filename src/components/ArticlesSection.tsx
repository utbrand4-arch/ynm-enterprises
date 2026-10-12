import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { ArticleItem } from '../types';

export const articlesData: ArticleItem[] = [
  {
    id: 'understanding-b2b-tissue-supply',
    title: 'Understanding B2B Tissue Supply',
    excerpt:
      'A practical guide for corporate buyers, retail shop owners, and distributors navigating bulk paper supply channels and packaging formats in Pakistan.',
    date: 'October 2026',
    readTime: '4 min read',
    content: [
      'B2B tissue procurement differs significantly from individual retail purchasing. In a commercial wholesale context, business buyers evaluate product dimensions, sheet ply structure, outer carton pack-counts, and replenishment lead times rather than single-pack visual impulse factors.',
      'For wholesale distributors and retailers, tissue paper is a steady-velocity fast-moving consumer good (FMCG). Establishing a reliable supply pipeline ensures that store shelves and institutional washrooms remain continuously stocked without unexpected inventory depletion.',
      'When working with suppliers like YNM Enterprises in Karachi, business customers benefit from direct communication regarding production batches, carton configurations, and schedule predictability.',
    ],
  },
  {
    id: 'planning-tissue-requirements',
    title: 'How Wholesale Buyers Can Plan Their Tissue Requirements',
    excerpt:
      'Key considerations for estimating seasonal demand, storage footprint, and replenishment frequency for commercial tissue inventories.',
    date: 'October 2026',
    readTime: '5 min read',
    content: [
      'Accurate demand forecasting prevents both stock-outs and bloated warehouse holding costs. Wholesale buyers should assess historical turnover rates across facial tissue party packs and multi-roll toilet tissue bundles.',
      'Volume considerations should always take warehouse footprint into account. Because tissue paper is lightweight yet bulky, palletized carton stacking and dry storage conditions must be planned ahead of container or truck dispatches.',
      'By sharing forward-looking projections with your bulk supplier, buyers can secure planned batch production runs and avoid spot-market procurement bottlenecks.',
    ],
  },
  {
    id: 'choosing-tissue-products',
    title: 'Choosing Tissue Products for Different Business Needs',
    excerpt:
      'Comparing facial tissue party packs with multi-roll bathroom tissue to determine optimal procurement mixes for hotels, offices, and retail chains.',
    date: 'September 2026',
    readTime: '3 min read',
    content: [
      'Different commercial settings demand distinct paper characteristics. High-traffic hospitality venues and executive offices require soft, absorbent facial tissue packs that present an orderly aesthetic at reception counters and dining tables.',
      'Conversely, commercial facilities, hospitals, and educational institutions prioritize high sheet counts and durable rolls such as the Releaf Maxsoft 10-roll bundles, which reduce daily replacement maintenance cycles.',
      'Matching the appropriate product grade to your end-user environment ensures cost efficiency without compromising on user experience.',
    ],
  },
  {
    id: 'questions-before-bulk-order',
    title: 'Questions to Ask Before Placing a Bulk Tissue Order',
    excerpt:
      'A checklist covering carton units, pack specifications, transport arrangements, and dispatch schedules prior to finalizing purchase orders.',
    date: 'September 2026',
    readTime: '4 min read',
    content: [
      'Before placing an initial wholesale purchase order, procurement officers should clarify several essential operational details with their supply partner:',
      '1. Packaging Units: Confirm whether orders are invoiced per master carton, inner shrink-pack, or individual unit count to ensure billing clarity.',
      '2. Dispatch Coordination: Clarify whether dispatches will be collected from Karachi warehousing or arranged through dedicated third-party logistics to your destination hub.',
      '3. Order Lead Times: Establish expected turnaround times from inquiry confirmation to dispatch readiness, allowing appropriate buffer for transport.',
    ],
  },
];

export const ArticlesSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  // Prevent background page scrolling while the article popup is open to eliminate double scrollbars
  useEffect(() => {
    if (activeArticle) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setActiveArticle(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeArticle]);

  return (
    <section id="articles" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Corporate Journal &middot; Business Insights
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Articles and Procurement Insights
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-pretty">
            Practical perspectives and operational guidance written for commercial buyers, wholesale distributors, and facility procurement managers.
          </p>
        </div>

        {/* Clean Editorial Journal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articlesData.map((article) => (
            <article
              key={article.id}
              className="group bg-white/95 rounded-2xl p-8 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Clean Editorial Metadata without pill capsules */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{article.date}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{article.readTime}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="text-teal-700 font-medium">B2B Supply</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-teal-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-md"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Article Full Reader Modal — Positioned below sticky header with dedicated internal scroll */}
        {activeArticle && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 md:p-8 pt-24 sm:pt-24 pb-4 sm:pb-8 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setActiveArticle(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
          >
            {/* Modal Card */}
            <div
              className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[calc(100vh-6.5rem)] sm:max-h-[calc(100vh-7.5rem)] flex flex-col shadow-2xl border border-slate-200/90 relative animate-in zoom-in-95 duration-200 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed Header Zone Inside Modal */}
              <div className="p-5 sm:p-8 pb-4 sm:pb-5 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0 bg-white">
                <div className="space-y-1.5 pr-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{activeArticle.date}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{activeArticle.readTime}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="text-teal-700 font-medium">YNM Enterprises Editorial</span>
                  </div>

                  <h3
                    id="article-modal-title"
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-tight text-balance"
                  >
                    {activeArticle.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                  aria-label="Close article modal"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Scrollable Body Zone — Smooth Internal Scroll Only */}
              <div className="p-5 sm:p-8 overflow-y-auto overscroll-contain flex-1 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Fixed Footer Zone Inside Modal */}
              <div className="p-4 sm:p-6 px-5 sm:px-8 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0 bg-slate-50/70">
                <span className="text-xs text-slate-500 truncate">
                  Published for YNM Enterprises Business Buyers
                </span>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-teal-700 transition-colors shrink-0 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
