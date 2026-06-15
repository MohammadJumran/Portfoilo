import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";
import { useT } from "@/i18n/translations";

const socialLinks = [
  { icon: Github, href: site.socials.github, label: "GitHub" },
  { icon: Linkedin, href: site.socials.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${site.email}`, label: "Email" },
];

const footerItems = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#experience", key: "experience" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
];

export const Footer = () => {
  const t = useT();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-10" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-start">
            <a href="#home" className="text-xl font-bold tracking-tight">
              {site.initials}
              <span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} {t.hero.name}. {t.footer.rights}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              {t.footer.roles}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerItems.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={social.label}
                className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
