import React, { useEffect, useRef } from "react";
import { Skill } from "@/lib/Interface/portfolio-type";

export default function Skills({ skills }: { skills: Skill[] }) {
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logosRef.current) {
      // Dupliquer le contenu pour l'effet de boucle
      const slide = logosRef.current.querySelector(".logos-slide");
      if (slide) {
        const copy = slide.cloneNode(true) as Node;
        logosRef.current.appendChild(copy);
      }
    }
  }, []);

  return (
    <div className="text-white p-8 pt-20 ">
      <div className="">
        {/* Header */}
        <div className="mb-8 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <div className="hero-line h-1 w-24"></div>
        </div>

        {/* Scrolling Logos */}
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
