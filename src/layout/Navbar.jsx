import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useT } from "@/i18n/translations";
import { LanguageToggle } from "@/components/LanguageToggle";

const navItems = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#experience", key: "experience" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
];

export const Navbar = () => {
  const t = useT();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-500 z-50 ${
        isScrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between relative">
        <a
          href="#home"
          className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
        >
          {site.initials}
          <span className="text-primary">.</span>
        </a>

        {/* Desktop Nav — centered */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navItems.map((link) => (
              <a
                href={link.href}
                key={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface transition-colors"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </div>
        </div>

        {/* Right side: language toggle (desktop) + mobile controls */}
        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden md:inline-flex" />

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navItems.map((link) => (
              <a
                href={link.href}
                key={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-muted-foreground hover:text-foreground py-2 transition-colors"
              >
                {t.nav[link.key]}
              </a>
            ))}
            <LanguageToggle className="self-start" />
          </div>
        </div>
      )}
    </header>
  );
};
