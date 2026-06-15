import { useEffect } from "react";
import { ArrowLeft, FolderGit2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { NetworkBackground } from "@/components/NetworkBackground";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useT } from "@/i18n/translations";

export const AllProjects = () => {
  const t = useT();
  const items = projects.map((p, i) => ({ ...p, ...t.projects.items[i] }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <section className="py-32 relative overflow-hidden">
          <NetworkBackground variant="default" />

          <div className="container mx-auto px-6 relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              {t.allProjects.back}
            </Link>

            <SectionHeader
              eyebrow={t.allProjects.eyebrow}
              eyebrowIcon={FolderGit2}
              title={t.allProjects.title}
              accent={t.allProjects.accent}
              description={t.allProjects.description}
            />

            <StaggerGroup
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
              stagger={0.06}
            >
              {items.map((project, idx) => (
                <StaggerItem key={idx}>
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
