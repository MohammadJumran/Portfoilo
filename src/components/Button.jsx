export const Button = ({
  className = "",
  size = "default",
  variant = "primary",
  children,
  ...props
}) => {
  const baseClasses =
    "relative overflow-hidden rounded-full font-medium inline-flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40",
    outline:
      "bg-transparent border border-border text-foreground hover:border-primary/50 hover:bg-primary/5",
    ghost: "bg-transparent text-foreground hover:bg-surface",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  return (
    <button className={classes} {...props}>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
