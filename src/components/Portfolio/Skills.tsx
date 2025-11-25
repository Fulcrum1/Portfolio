"use client";
import React, { useEffect, useRef, useState } from "react";
import { Skill } from "@/lib/Interface/portfolio-type";
import { Button } from "@/components/ui/button";
import { Language } from "@/lib/translations";

export default function Skills({
  title,
  skills,
  language,
}: {
  title: string;
  skills: Skill[];
  language: Language;
}) {
  const [fixed, setFixed] = useState(false);
  const logosRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (logosRef.current && !fixed) {
      // Nettoyer les clones existants
      const slides = logosRef.current.querySelectorAll(".logos-slide");
      if (slides.length > 1) {
        for (let i = 1; i < slides.length; i++) {
          slides[i].remove();
        }
      }

      // Dupliquer le contenu pour l'effet de boucle
      const slide = logosRef.current.querySelector(".logos-slide");
      if (slide) {
        const copy = slide.cloneNode(true) as Node;
        logosRef.current.appendChild(copy);
      }
    }
  }, [fixed]);

  return (
    <div className="text-white p-8 mb-30 pt-20 ">
      <div className="">
        {/* Header */}
        <div className="flex justify-between mb-8 max-w-7xl mx-auto">
          <div>
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent">
              {title}
            </h2>
            <div className="hero-line h-1 w-24"></div>
          </div>
          <div>
            <Button
              className="rounded-full backdrop-blur-md navbar-bg border navbar-border shadow-lg"
              onClick={() => setFixed(!fixed)}
            >
              {fixed
                ? language === "fr"
                  ? "Passer en défilement"
                  : "Switch to scroll"
                : language === "fr"
                ? "Fixer la grille"
                : "Fix grid"}{" "}
            </Button>
          </div>
        </div>

        {/* Scrolling Logos */}
        {!fixed && (
          <div ref={logosRef} className="logos overflow-hidden">
            <div className="logos-slide">
              {skills.map((skill, i) => (
                <div key={i} className="skill-item group mx-12">
                  <div className="flex flex-col items-center">
                    {/* Icon */}
                    <div className="w-16 h-16 transition-all duration-300 filter group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110">
                      <img
                        src={`Images/Logo/${skill.url}.svg`}
                        alt={skill.label}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Label - apparaît au survol */}
                    <p className="mt-2 text-base font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {skill.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Skills Grid */}
        {fixed && (
          <div className="max-w-7xl mx-auto flex flex-wrap gap-18 justify-center items-center">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="group flex flex-col items-center transition-all duration-300 hover:scale-110"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${i * 0.05}s both`,
                }}
              >
                {/* Icon */}
                <div className="w-16 h-16 mb-2 transition-all duration-300 filter group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <img
                    src={`Images/Logo/${skill.url}.svg`}
                    alt={skill.label}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Label */}
                <p className="text-base font-medium text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all duration-300 text-center">
                  {skill.label}
                </p>
              </div>
            ))}{" "}
          </div>
        )}
      </div>
      <style jsx>{`
        .logos {
          width: 100%;
          overflow: hidden;
        }

        .logos-slide {
          animation: scroll 20s linear infinite;
          display: inline-block;
          white-space: nowrap;
        }

        .skill-item {
          display: inline-block;
          vertical-align: top;
          white-space: normal;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
