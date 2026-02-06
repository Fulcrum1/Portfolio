'use client';

import { useEffect } from 'react';
import Hero from '@/components/Home/Hero';
import About from '@/components/Home/About';
import Projects from '@/components/Home/Projects';
import Contact from '@/components/Home/Contact';
import Footer from '@/components/Home/Footer';
import { useLanguage } from "@/components/Global/Navbar";

export default function Home() {
  const { language } = useLanguage();
  
  // Animation au scroll uniquement
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
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
        className="fixed inset-0 opacity-10 pointer-events-none cyber-background modern-background"
      />

      {/* Main content */}
      <div className="relative max-w-6xl mx-auto px-6 pb-12 md:pb-20">
        <Hero language={language} />
        <About language={language} />
        <Projects language={language} />
        <Contact language={language} />
        <Footer language={language} />
      </div>
    </div>
  );
}