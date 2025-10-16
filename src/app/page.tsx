'use client';

import { useEffect, useState } from 'react';
import { Language } from './translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [language, setLanguage] = useState<Language>('fr');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  // Animation au scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Update active section for navbar
          const sectionId = entry.target.id;
          if (sectionId) setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    // Observer tous les éléments à animer
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-left, .animate-fade-right, .animate-scale');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Scanline effect */}
      <div className="scanline" />
      
      {/* Grid background overlay */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} 
      />

      <Navbar 
        activeSection={activeSection}
        language={language}
        onLanguageToggle={toggleLanguage}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-12 md:pt-40 md:pb-20">
        <Hero language={language} />
        <About language={language} />
        <Skills language={language} />
        <Projects language={language} />
        <Contact language={language} />
        <Footer language={language} />
      </div>
    </div>
  );
}
