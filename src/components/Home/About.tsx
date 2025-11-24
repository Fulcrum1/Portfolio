import { Language, translations } from "@/lib/translations";
import Title from "../Global/title";
interface AboutProps {
  language: Language;
}

export default function About({ language }: AboutProps) {
  const t = translations[language];

  return (
    <section id="about" className="mb-20 scroll-mt-24">
      <Title>{t.home.about.title}</Title>
      <div className="card rounded-lg p-8 md:p-10 animate-fade-right relative overflow-hidden group">
        <div className="absolute inset-0 " />

        <div className="absolute left-0 top-0 h-full w-1 left-vertical-line-main" />

        <div className="relative space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 rounded-full animated-dot" />
            </div>
            <p className=" leading-relaxed text-lg">{t.home.about.text1}</p>
          </div>

          <div className="h-px about-line" />

          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <div>
              <p className="text-sm font-mono mb-3 uppercase tracking-wider">
                Stack Technique
              </p>
              <p className="leading-relaxed">{t.home.about.text2}</p>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 rounded-bl-lg" />
      </div>
    </section>
  );
}
