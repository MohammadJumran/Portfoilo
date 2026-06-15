import { ServerCog, ShieldCheck, Network, LifeBuoy, Cctv } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { NetworkBackground } from "@/components/NetworkBackground";
import { useT } from "@/i18n/translations";

// Icons for the expertise cards, matched by index to about.highlights text.
const highlightIcons = [ServerCog, Network, ShieldCheck, LifeBuoy, Cctv];

export const About = () => {
  const t = useT();

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <NetworkBackground variant="muted" flows={false} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — narrative */}
          <div className="space-y-7">
            <SectionHeader
              eyebrow={t.about.eyebrow}
              title={t.about.title}
              accent={t.about.accent}
              align="start"
            />

            <div className="space-y-4 text-muted-foreground">
              {t.about.paragraphs.map((p, i) => (
                <Reveal key={i} direction="up" delay={0.1 + i * 0.06}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal direction="up" delay={0.28}>
              <div className="panel rounded-2xl p-6 glow-border">
                <p className="text-lg font-medium italic text-foreground">
                  {t.about.quote}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right — expertise cards */}
          <StaggerGroup className="grid sm:grid-cols-2 gap-5">
            {t.about.highlights.map((item, idx) => {
              const Icon = highlightIcons[idx] ?? ServerCog;
              return (
                <StaggerItem key={item.title}>
                  <div className="panel panel-hover rounded-2xl p-6 h-full group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
};
