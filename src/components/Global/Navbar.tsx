"use client";
import { Language, translations } from "@/lib/translations";
import { createContext, useContext, useEffect, useState } from "react";
import { Paintbrush } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type LanguageContextType = {
  language: Language;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<string | null>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [navItems, setNavItems] = useState<
    {
      id: string;
      label: string;
      href: string;
    }[]
  >([]);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "fr" : "en"));
  };

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const path = typeof window !== "undefined" ? window.location.pathname : "/";

    setCurrent(hash ? hash.slice(1) : path === "/" ? "home" : path.slice(1));

    const items = [
      {
        id: "home",
        label: t.nav.home,
        href: path === "/" ? "#home" : "/#home",
      },
      {
        id: "about",
        label: t.nav.about,
        href: path === "/" ? "#about" : "/#about",
      },
      {
        id: "projects",
        label: t.nav.projects,
        href: path === "/" ? "#projects" : "/#projects",
      },
      {
        id: "contact",
        label: t.nav.contact,
        href: path === "/" ? "#contact" : "/#contact",
      },
      { id: "portfolio", label: t.nav.portfolio, href: "/portfolio" },
    ];
    setNavItems(items);
  }, [t.nav]);

  const contextValue = {
    language,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      <div className="relative">
        <div className="hidden sm:block fixed top-4 left-4 z-50">
          <ThemeButton />
        </div>
        <nav
          className={`z-1 rounded-full fixed top-4 left-1/2 transform -translate-x-1/2 flex justify-center backdrop-blur-md navbar-bg border navbar-border shadow-lg w-full mx-auto sm:w-150`}
        >
          <div className="w-full px-4 py-2">
            <div className="flex items-start justify-center gap-2">
              <div className="block sm:hidden">
                <ThemeButton />
              </div>
              <ul className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={() => setCurrent(item.id)}
                      className={`font-mono text-xs md:text-sm transition-all duration-300 px-2 py-1 ${current === item.id ? "main-color glow-subtle" : ""
                        }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="block sm:hidden">
                <LanguageButton
                  language={language}
                  onLanguageToggle={toggleLanguage}
                />
              </div>
            </div>
          </div>
        </nav>
        <div className="hidden sm:block fixed top-4 right-4 z-50">
          <LanguageButton
            language={language}
            onLanguageToggle={toggleLanguage}
          />
        </div>
      </div>
      {children}
    </LanguageContext.Provider>
  );
}

export function ThemeButton() {
  const { toggleTheme } = useTheme();

  return <Paintbrush onClick={toggleTheme} />;
}

export function LanguageButton({
  language,
  onLanguageToggle,
}: {
  language: Language;
  onLanguageToggle: () => void;
}) {
  return (
    <button
      onClick={onLanguageToggle}
      className="px-2 py-1 md:px-3 md:py-1.5 font-mono text-xs md:text-sm border language-button-border language-button-text rounded transition-all duration-300 cursor-pointer"
    >
      {language === "fr" ? "EN" : "FR"}
    </button>
  );
}
