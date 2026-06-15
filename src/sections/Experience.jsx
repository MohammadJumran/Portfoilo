import { Briefcase, MapPin } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { NetworkBackground } from "@/components/NetworkBackground";
import { experiences } from "@/data/experience";
import { useT } from "@/i18n/translations";

export const Experience = () => {
  const t = useT();

  return (
    <section
      id="experience"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <NetworkBackground variant="muted" flows={false} />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow={t.experience.eyebrow}
          eyebrowIcon={Briefcase}
          title={t.experience.title}
          accent={t.experience.accent}
          description={t.experience.description}
        />

        <div className="relative mt-16 max-w-3xl mx-auto">
          {/* Vertical spine */}
          <div className="absolute ltr:left-4 rtl:right-4 md:ltr:left-5 md:rtl:right-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/70 via-primary/30 to-transparent">
            <div className="absolute -left-px top-0 h-16 w-px bg-gradient-to-b from-transparent via-primary to-transparent animate-data-flow" />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, idx) => {
              const text = t.experience.items[idx] ?? {};
              return (
                <Motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative ltr:pl-12 rtl:pr-12 md:ltr:pl-16 md:rtl:pr-16"
                >
                  {/* Node */}
                  <div className="absolute ltr:left-4 rtl:right-4 md:ltr:left-5 md:rtl:right-5 top-6 w-3 h-3 -translate-x-1/2 rtl:translate-x-1/2 rounded-full bg-primary ring-4 ring-background z-10">
                    {exp.current && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                    )}
                  </div>

                  <div className="panel panel-hover rounded-2xl p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-xs text-primary" dir="ltr">
                        {exp.period}
                      </span>
                      {exp.current && (
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-2.5 py-0.5">
                          {t.experience.current}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{text.role}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span className="font-medium text-foreground/80">
                        {exp.company}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {text.location}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                      {text.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-surface/60 border border-border/50 text-xs rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
