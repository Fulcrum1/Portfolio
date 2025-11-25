"use client";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Calendar, Check, MapPin } from "lucide-react";
import { Formation } from "@/lib/Interface/portfolio-type";
import React from "react";

export default function Education({ title, formations }: { title: string; formations: Formation[] }) {
  const [activeStep, setActiveStep] = React.useState(1);
  const formationRefs = React.useRef<HTMLDivElement[]>([]);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      formationRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveStep(index + 1);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFormation = (index: number) => {
    formationRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };


  return (
    <>
      <div className="text-white p-8 pt-20 ">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-2">{title}</h2>
            <div className="hero-line h-1 w-24"></div>
          </div>
          <div className="flex gap-8 relative">
            {/* Stepper Navigation - Vertical à gauche */}
            <div className="w-24 flex-shrink-0">
              <div className="sticky top-8">
                <Stepper
                  value={activeStep}
                  onValueChange={(value) => scrollToFormation(value - 1)}
                  orientation="vertical"
                  indicators={{
                    completed: <Check className="size-4" />,
                  }}
                >
                  <StepperNav className="flex flex-col gap-0">
                    {formations.map((_, index) => (
                      <StepperItem
                        key={index + 1}
                        step={index + 1}
                        className="flex flex-col items-center"
                      >
                        <StepperTrigger>
                          <StepperIndicator className="w-12 h-12 text-lg font-bold rounded-full flex items-center justify-center transition-all duration-300">
                            {index + 1}
                          </StepperIndicator>
                        </StepperTrigger>
                        {index < formations.length - 1 && (
                          <StepperSeparator className="h-24 w-0.5 transition-all duration-300" />
                        )}
                      </StepperItem>
                    ))}
                  </StepperNav>
                </Stepper>
              </div>
            </div>

            <div className="flex-1 space-y-12">
              {formations.map((form, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) {
                      formationRefs.current[index] = el;
                    }
                  }}
                  className="scroll-mt-8"
                >
                  <div
                    className="card rounded-xl p-8 transition-all duration-300"
                    style={{
                      borderColor:
                        activeStep === index + 1 ? "var(--warm-border)" : "",
                      boxShadow:
                        activeStep === index + 1
                          ? "0 0 30px var(--warm-shadow)"
                          : "",
                      transform:
                        activeStep === index + 1 ? "scale(1.02)" : "scale(1)",
                    }}
                  >

                    <div key={index} className="scroll-mt-8">
                      <div className="flex items-center gap-2 main-color font-medium mb-3">
                        <Calendar className="w-5 h-5" />
                        <span className="glow-subtle">{form.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400 mb-4">
                        <MapPin className="w-5 h-5" />
                        {form.location} - {form.school}
                      </div>
                      <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <span>{form.diploma}</span>
                      </h3>
                      <div className="mb-6">
                        {form.details && form.details.map((detail, index) => (
                          <p className="hero-text text-lg" key={index}>{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
