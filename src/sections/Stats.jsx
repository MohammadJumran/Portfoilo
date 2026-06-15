import { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { stats } from "@/data/stats";
import { useT } from "@/i18n/translations";

export const Stats = () => {
  const t = useT();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Banded background with grid texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent" />
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="panel rounded-3xl px-6 py-10 md:px-12">
          <StaggerGroup
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6"
            stagger={0.1}
          >
            {stats.map((stat, idx) => (
              <StaggerItem key={idx} className="text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-foreground tabular-nums">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.stats.labels[idx]}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
};
