import { Cpu } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { NetworkBackground } from "@/components/NetworkBackground";
import { skillGroups } from "@/data/skills";
import { useT } from "@/i18n/translations";

export const Skills = () => {
  const t = useT();

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <NetworkBackground variant="default" flows={false} />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow={t.skills.eyebrow}
          eyebrowIcon={Cpu}
          title={t.skills.title}
          accent={t.skills.accent}
          description={t.skills.description}
        />

        <StaggerGroup
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          stagger={0.06}
        >
          {skillGroups.map((group, idx) => (
            <StaggerItem key={idx}>
              <div className="panel panel-hover rounded-2xl p-6 h-full group">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <group.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold">
                    {t.skills.groupTitles[idx]}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2" dir="ltr">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-surface/60 border border-border/50 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};
