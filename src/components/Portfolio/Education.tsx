import { Calendar, MapPin } from "lucide-react";
import { Language, translations } from "@/lib/translations";

export default function Education({ language }: { language: Language }) {
  const t = translations[language];
  return (
    <>
      <div className="text-white p-8 pt-20 ">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-2">Formations</h2>
            <div className="hero-line h-1 w-24"></div>
          </div>
          <div className="flex-1 space-y-12">
            {t.portfolio.formations.map((form, index) => (
              <div className="card rounded-xl p-8 transition-all duration-300">
                <div key={index} className="scroll-mt-8">
                  <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <span>{form.diploma}</span>
                  </h3>
                  <p className="mb-4 leading-relaxed">{form.school}</p>

                  {/* Company & Location */}
                  <div className="flex items-center gap-2 text-zinc-400 mb-4">
                    <MapPin className="w-5 h-5" />
                    {form.location}
                  </div>
                  <div className="flex items-center gap-2 main-color font-medium mb-3">
                    <Calendar className="w-5 h-5" />
                    <span className="glow-subtle">{form.period}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
