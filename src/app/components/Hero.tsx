import React from "react";
import { Language, translations } from "../translations";

interface Translations {
  hero: {
    name: string;
    role: string;
    description: string;
  };
}

interface HeroProps {
  language?: Language;
}

export default function Hero({ language = "fr" }: HeroProps) {
  const t = translations[language];

  return (
    <header
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="w-full max-w-6xl">
        <div className="flex flex-col lg:items-center lg:justify-between gap-8 lg:gap-12">
          <div className="flex-1">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="hero-line w-1 h-12 sm:h-16 flex-shrink-0 mt-1 sm:mt-0" />
              <div className="min-w-0">
                <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 break-words">
                  {t.hero.name.split(" ")[0]}
                  <br className="sm:hidden" />
                  <span className="sm:ml-3">{t.hero.name.split(" ")[1]}</span>
                </h1>
                <p className="hero-text text-base text-xl lg:text-2xl font-mono">
                  <span className="inline-block mr-2">{">"}</span>
                  <span className="inline-block">{t.hero.role}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 lg:max-w-2xl">
            <p className="text-base text-xl leading-relaxed">
              {t.hero.description}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex justify-center mt-16 lg:mt-24">
          <div className="scroll-color flex flex-col items-center gap-2 opacity-60 animate-bounce">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
