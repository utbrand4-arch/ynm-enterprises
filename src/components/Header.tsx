import React, { useState } from 'react';
import { MessageCircle, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Products', id: 'products' },
    { label: 'Articles', id: 'articles' },
    { label: 'About Us', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Official Company Logo & Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="flex items-center gap-3.5 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg"
          aria-label="YNM Enterprises Home"
        >
          <img
            src="/ynm-logo.png"
            alt="YNM Enterprises Logo"
            referrerPolicy="no-referrer"
            className="w-10 h-10 object-contain rounded-md border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors whitespace-nowrap">
              YNM Enterprises
            </span>
            <span className="text-[11px] font-medium tracking-wider uppercase text-slate-500 whitespace-nowrap">
              B2B Tissue Supply &middot; Karachi
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 shrink-0"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`relative py-1 whitespace-nowrap transition-colors hover:text-slate-900 ${
                  isActive ? 'text-teal-700 font-semibold' : 'text-slate-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Direct WhatsApp CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/923063846729?text=Hello%20YNM%20Enterprises,%20I%20would%20like%20to%20discuss%20a%20bulk%20tissue%20product%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 rounded-lg transition-colors whitespace-nowrap"
            title="Chat directly with Abdul Waheed on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>+92 306 3846729</span>
          </a>

          <button
            onClick={() => handleLinkClick('quote-form')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <span>Request Bulk Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => handleLinkClick('quote-form')}
            className="sm:inline-flex hidden px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg"
          >
            Quote
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                  }}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => handleLinkClick('quote-form')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <span>Request Bulk Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/923063846729?text=Hello%20YNM%20Enterprises,%20I%20would%20like%20to%20discuss%20a%20bulk%20tissue%20product%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: +92 306 3846729</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
