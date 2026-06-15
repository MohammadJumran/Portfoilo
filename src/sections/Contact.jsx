import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Download,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { NetworkBackground } from "@/components/NetworkBackground";
import { useT } from "@/i18n/translations";
import { site } from "@/data/site";
import cvFile from "@/assets/Paper/CV.pdf";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: site.socials.linkedin },
  { icon: Github, label: "GitHub", href: site.socials.github },
];

const handleDownloadCV = () => {
  const link = document.createElement("a");
  link.href = cvFile;
  link.download = "Mohammad-Jumran-CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const Contact = () => {
  const t = useT();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

  const contactInfo = [
    {
      icon: Mail,
      label: t.contact.info.email,
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: Phone,
      label: t.contact.info.phone,
      value: site.phone,
      href: site.phoneHref,
    },
    {
      icon: MapPin,
      label: t.contact.info.location,
      value: t.contact.locationValue,
      href: "#",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/mohammadjum600@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New portfolio message from ${formData.name}`,
            _template: "table",
          }),
        }
      );

      const data = await response.json();

      // FormSubmit returns success as the string "true"
      if (data.success !== "true" && data.success !== true) {
        throw new Error(data.message || t.contact.error);
      }

      setSubmitStatus({ type: "success", message: t.contact.success });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus({ type: "error", message: t.contact.error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <NetworkBackground variant="default" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow={t.contact.eyebrow}
          eyebrowIcon={MessageSquare}
          title={t.contact.title}
          accent={t.contact.accent}
          description={t.contact.description}
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
          {/* Form */}
          <Reveal direction="right" className="min-w-0">
            <div className="panel rounded-3xl p-8 border-primary/20">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder={t.contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    dir="ltr"
                    placeholder={t.contact.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                </div>

                <Button
                  className="w-full"
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>{t.contact.sending}</>
                  ) : (
                    <>
                      {t.contact.send}
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>

                {submitStatus.type && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <p className="text-sm">{submitStatus.message}</p>
                  </div>
                )}
              </form>
            </div>
          </Reveal>

          {/* Info */}
          <Reveal direction="left" className="space-y-6 min-w-0">
            <div className="panel rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">
                {t.contact.infoTitle}
              </h3>
              <div className="space-y-3">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="font-medium break-words">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Socials + Resume */}
              <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-border/50">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-3 rounded-xl glass hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadCV}
                  className="ms-auto"
                >
                  <Download className="w-4 h-4" />
                  {t.contact.resume}
                </Button>
              </div>
            </div>

            {/* Availability */}
            <div className="panel rounded-3xl p-8 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">{t.contact.available}</span>
              </div>
              <p className="text-muted-foreground text-sm">
                {t.contact.availableBody}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
