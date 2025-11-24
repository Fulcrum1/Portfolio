import React from "react";
import { Code, Server, Database, GitBranch } from "lucide-react";
import { Language, translations } from "@/lib/translations";
const tagColors = ["tag-main", "tag-secondary"];

export default function Skills({ language }: { language: Language }) {
  const t = translations[language];
  return (
    <>
      <div className="text-white p-8 pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-2">Compétences</h2>
            <div className="hero-line h-1 w-24"></div>
          </div>
          <div className="flex-1 space-y-12">
            {t.portfolio.skills.map((skill, index) => (
              <div className="card rounded-xl p-8 transition-all duration-300">
                <div key={index} className="scroll-mt-8">
                  <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <span>{skill.category}</span>
                  </h3>
                  {skill.skills.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-sm font-mono border rounded mx-2 ${
                        tagColors[i % tagColors.length]
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
