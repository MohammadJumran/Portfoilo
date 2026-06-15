import { ArrowUpRight, Github } from "lucide-react";

/**
 * Enterprise project card: category eyebrow, domain icon, image with overlay
 * links, description, and tag chips. Animation is handled by the parent
 * (StaggerItem / Reveal), so this stays purely presentational.
 */
export const ProjectCard = ({ project }) => {
  const Icon = project.icon;
  return (
    <div className="group panel panel-hover rounded-2xl overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        {/* Category chip */}
        {project.category && (
          <span className="absolute top-3 left-3 glass rounded-full px-3 py-1 text-[11px] font-medium text-primary border border-primary/20">
            {project.category}
          </span>
        )}

        {/* Overlay links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <ArrowUpRight className="w-5 h-5" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex items-start gap-3">
          {Icon && (
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          )}
          <h3 className="text-lg font-semibold leading-snug mt-1 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-surface/60 text-xs font-medium border border-border/50 text-muted-foreground group-hover:border-primary/30 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
