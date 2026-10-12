import React, { useState, useEffect, useCallback } from 'react';
import { BackgroundMedia } from './components/BackgroundMedia';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductShowcase } from './components/ProductShowcase';
import { B2BWholesaleProcess } from './components/B2BWholesaleProcess';
import { ArticlesSection } from './components/ArticlesSection';
import { AboutSection } from './components/AboutSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { ContactFooter } from './components/ContactFooter';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string>('Releaf Party Pack Pink');

  // Smooth scroll handler taking into account the fixed header
  const scrollToSection = useCallback((sectionId: string, updateHistory = true) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      if (updateHistory) {
        window.history.pushState(null, '', `#${sectionId}`);
      }
    }
  }, []);

  // Handle direct hash navigation on page load (e.g. domain/#quote-form)
  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          scrollToSection(hash, false);
        }, 150);
      }
    };

    handleInitialHash();

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        scrollToSection(hash, false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [scrollToSection]);

  // Track active section during scroll using Intersection Observer
  useEffect(() => {
    const sectionIds = ['home', 'products', 'articles', 'about', 'contact', 'quote-form'];
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -40% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          if (window.location.hash !== `#${id}`) {
            window.history.replaceState(null, '', `#${id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // When clicking "Request Bulk Quote" from any product card
  const handleProductQuoteSelect = (productName: string) => {
    setSelectedProductForQuote(productName);
    scrollToSection('quote-form');
  };

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-teal-600 selection:text-white">
      {/* Real Full-Website Background Video Playing Behind Content */}
      <BackgroundMedia />

      {/* Fixed Header (Always visible at top of viewport across all sections) */}
      <Header activeSection={activeSection} onNavigate={(id) => scrollToSection(id)} />

      {/* Foreground Content Stack with top padding matching fixed header height */}
      <div className="relative z-10 flex flex-col min-h-screen pt-20">
        <main className="flex-1">
          {/* Section 1: Hero */}
          <Hero onNavigate={(id) => scrollToSection(id)} />

          {/* Section 2: Products Showcase */}
          <ProductShowcase onSelectProductForQuote={handleProductQuoteSelect} />

          {/* Section 3: B2B Wholesale Process */}
          <B2BWholesaleProcess onNavigate={(id) => scrollToSection(id)} />

          {/* Section 4: Articles & Business Insights */}
          <ArticlesSection />

          {/* Section 5: About YNM Enterprises */}
          <AboutSection onNavigate={(id) => scrollToSection(id)} />

          {/* Section 6: Final Inquiry Form (#quote-form) */}
          <QuoteFormSection
            selectedProduct={selectedProductForQuote}
            onClearSelectedProduct={() => setSelectedProductForQuote('Releaf Party Pack Pink')}
          />
        </main>

        {/* Section 7: Final Contact & Corporate Footer */}
        <ContactFooter onNavigate={(id) => scrollToSection(id)} />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp />
      </div>
    </div>
  );
}
