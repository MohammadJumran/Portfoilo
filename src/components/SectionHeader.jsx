import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/Badge";

/**
 * Consistent section heading: eyebrow badge + title (with an italic accent
 * fragment) + optional description. Used across every section for rhythm.
 */
export const SectionHeader = ({
  eyebrow,
  eyebrowIcon,
  title,
  accent,
  description,
  align = "center",
  className = "",
}) => {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "items-start";

  return (
    <div
      className={`flex flex-col gap-5 max-w-3xl ${alignment} ${
        align === "center" ? "mx-auto" : ""
      } ${className}`}
    >
      {eyebrow && (
        <Reveal direction="up">
          <Badge variant="primary" icon={eyebrowIcon} className="uppercase">
            {eyebrow}
          </Badge>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.08}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
          {title}{" "}
          {accent && (
            <span className="font-serif italic font-normal text-primary">
              {accent}
            </span>
          )}
        </h2>
      </Reveal>
      {description && (
        <Reveal direction="up" delay={0.16}>
          <p
            className={`text-muted-foreground text-base md:text-lg ${
              align === "center" ? "max-w-2xl" : "max-w-xl"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
};
