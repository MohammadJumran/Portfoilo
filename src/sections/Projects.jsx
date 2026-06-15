import { FolderGit2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/SectionHeader";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/Reveal";
import { NetworkBackground } from "@/components/NetworkBackground";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useT } from "@/i18n/translations";

export const Projects = () => {
  const t = useT();
  // Merge structural data with translated text by index.
  const items = projects.map((p, i) => ({ ...p, ...t.projects.items[i] }));

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <NetworkBackground variant="default" flows={false} />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow={t.projects.eyebrow}
          eyebrowIcon={FolderGit2}
          title={t.projects.title}
          accent={t.projects.accent}
          description={t.projects.description}
        />

        <StaggerGroup
          className="grid md:grid-cols-2 gap-6 mt-16"
          stagger={0.08}
        >
          {items.map((project, idx) => (
            <StaggerItem key={idx}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal direction="up" className="text-center mt-12">
          <Link to="/projects" aria-label={t.projects.viewAll}>
            <AnimatedBorderButton>
              {t.projects.viewAll}
              <ArrowUpRight className="w-5 h-5" />
            </AnimatedBorderButton>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
