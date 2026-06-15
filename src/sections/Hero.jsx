import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  ShieldCheck,
  Activity,
  MapPin,
  Server,
  Network,
  Cloud,
  Database,
  Cctv,
  TerminalSquare,
} from "lucide-react";
import { KaliLinux } from "@/components/icons/KaliLinux";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { NetworkBackground } from "@/components/NetworkBackground";
import { useT } from "@/i18n/translations";
import { site } from "@/data/site";
import { techMarquee } from "@/data/skills";
import profilePhoto from "@/assets/Paper/image.jpg";
import cvFile from "@/assets/Paper/CV.pdf";

// Skill-category icons travelling around the profile photo frame.
const orbitIcons = [
  Server,
  Network,
  ShieldCheck,
  Cloud,
  Database,
  Cctv,
  KaliLinux,
  TerminalSquare,
];

const handleDownloadCV = () => {
  const link = document.createElement("a");
  link.href = cvFile;
  link.download = "Mohammad-Jumran-CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const RotatingRole = () => {
  const t = useT();
  const roles = t.hero.roles;
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span className="relative inline-flex h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <Motion.span
          key={`${index}-${roles[index]}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary glow-text whitespace-nowrap"
        >
          {roles[index]}
        </Motion.span>
      </AnimatePresence>
    </span>
  );
};

export const Hero = () => {
  const t = useT();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      <NetworkBackground variant="hero" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div className="space-y-8 min-w-0">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" icon={Activity}>
                {t.hero.available} · {site.yearsExperience}{" "}
                {t.hero.yearsExperience}
              </Badge>
            </Motion.div>

            <Motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-[clamp(1.7rem,7vw,3.75rem)] font-bold leading-[1.1] break-words"
            >
              {t.hero.greeting} {t.hero.name}.
              <br />
              <span className="text-muted-foreground text-[clamp(1.4rem,5.5vw,3rem)]">
                {t.hero.iam}
              </span>
              <br />
              <RotatingRole />
            </Motion.h1>

            <Motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-lg text-muted-foreground max-w-xl"
            >
              {t.hero.summary}
            </Motion.p>

            <Motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#contact">
                <Button size="lg">
                  {t.hero.getInTouch} <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <Button variant="outline" size="lg" onClick={handleDownloadCV}>
                <Download className="w-5 h-5" />
                {t.hero.downloadCV}
              </Button>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex items-center gap-4 pt-2"
            >
              <span className="text-sm text-muted-foreground">
                {t.hero.connect}
              </span>
              {[
                { icon: Github, href: site.socials.github, label: "GitHub" },
                {
                  icon: Linkedin,
                  href: site.socials.linkedin,
                  label: "LinkedIn",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2.5 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </Motion.div>
          </div>

          {/* Right — profile dashboard card */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative max-w-md mx-auto w-full"
          >
            {/* Skill-category icons travelling around the photo frame (desktop) */}
            <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none">
              {orbitIcons.map((Icon, i) => (
                <div
                  key={i}
                  className="frame-march"
                  style={{
                    animationDelay: `-${(
                      i *
                      (24 / orbitIcons.length)
                    ).toFixed(2)}s`,
                  }}
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl glass text-primary shadow-lg shadow-primary/10">
                    <Icon className="w-5 h-5" />
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-primary/10 blur-2xl animate-pulse" />

            <div className="relative panel rounded-3xl p-3 glow-border">
              {/* Window chrome */}
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {t.hero.statusOperational}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={profilePhoto}
                  alt={`${site.name}, ${t.hero.roles[0]}`}
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                  loading="eager"
                  width={480}
                  height={600}
                />
                {/* Scan sweep */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-scan" />
                </div>

                {/* Availability chip */}
                <div className="absolute bottom-3 left-3 glass rounded-xl px-3 py-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium">{t.hero.available}</span>
                </div>
              </div>

              {/* Mini stat row */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="glass rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-lg font-bold">
                      {site.yearsExperience}+
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {t.hero.yearsSecuring}
                  </div>
                </div>
                <div className="glass rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">
                      {t.hero.locationCity}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {t.hero.locationSub}
                  </div>
                </div>
              </div>
            </div>
          </Motion.div>
        </div>

        {/* Tech marquee */}
        <div className="mt-16 lg:mt-20">
          <p className="text-xs text-muted-foreground mb-5 text-center uppercase tracking-wider">
            {t.hero.techTitle}
          </p>
          <div className="relative overflow-hidden" dir="ltr">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-marquee w-max">
              {[...techMarquee, ...techMarquee].map((tech, idx) => (
                <span
                  key={idx}
                  className="flex-shrink-0 px-6 py-2 font-mono text-sm text-muted-foreground/60 hover:text-primary transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
