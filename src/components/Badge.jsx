/**
 * Small pill label used for section eyebrows and tags.
 * Variants follow a shadcn-style API.
 */
export const Badge = ({
  children,
  variant = "default",
  className = "",
  icon: Icon,
  ...props
}) => {
  const variants = {
    default:
      "bg-surface text-muted-foreground border border-border/60",
    primary:
      "glass text-primary border border-primary/30",
    outline: "border border-border text-muted-foreground",
    solid: "bg-primary/10 text-primary border border-primary/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
};
