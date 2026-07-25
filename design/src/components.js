// Alpine.data() component registry
// ShadCN-style: each factory returns state with a `classes()` method composing
// variant+size class strings using token-mapped Tailwind utilities.

export const components = {
  // ----- LAYOUT / ATOMS -----

  button: (variant = "primary", size = "md") => ({
    variant,
    size,
    classes() {
      const base =
        "inline-flex items-center justify-center font-bold transition select-none cursor-pointer";
      const variants = {
        primary:
          "bg-primary text-primary-foreground hover:opacity-90 shadow-xs",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost:
          "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
        outline:
          "bg-transparent text-foreground hover:bg-secondary",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
        link:
          "bg-transparent text-foreground hover:underline p-0 shadow-none",
      };
      const sizes = {
        sm: "px-3 py-1.5 text-[10px] rounded-sm",
        md: "px-5 py-2.5 text-xs rounded-md",
        lg: "px-6 py-3 text-sm rounded-lg",
        icon: "p-2.5 rounded-full",
      };
      return [base, variants[this.variant] || variants.primary, sizes[this.size] || sizes.md].join(" ");
    },
  }),

  iconButton: (variant = "ghost", size = "md") => ({
    variant,
    size,
    classes() {
      const base =
        "inline-flex items-center justify-center transition select-none cursor-pointer";
      const variants = {
        ghost:
          "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
        primary:
          "bg-primary text-primary-foreground hover:opacity-90",
        destructive:
          "bg-transparent text-muted-foreground hover:text-destructive hover:bg-destructive/10",
      };
      const sizes = {
        sm: "p-1.5 rounded-sm",
        md: "p-2.5 rounded-full",
        lg: "p-3 rounded-md",
      };
      return [base, variants[this.variant] || variants.ghost, sizes[this.size] || sizes.md].join(" ");
    },
  }),

  badge: (variant = "default") => ({
    variant,
    classes() {
      const base =
        "inline-flex items-center px-3.5 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-full select-none";
      const variants = {
        default:
          "bg-secondary text-secondary-foreground",
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive/10 text-destructive",
        outline: "bg-transparent text-foreground ring-1 ring-foreground/15",
      };
      return [base, variants[this.variant] || variants.default].join(" ");
    },
  }),

  separator: (orientation = "horizontal") => ({
    orientation,
    classes() {
      if (this.orientation === "vertical")
        return "w-px h-full bg-foreground/10";
      return "h-px w-full bg-foreground/10";
    },
  }),

  // ----- COMPOSITION -----

  card: (variant = "default") => ({
    variant,
    hovered: false,
    classes() {
      const base = "transition duration-300 cursor-default";
      const variants = {
        default:
          "bg-card rounded-lg p-6 shadow-xs",
        feature: "bg-transparent rounded-lg p-8",
        elevated: "bg-card rounded-lg p-6 shadow-md",
        flat: "bg-secondary/30 rounded-md p-5",
      };
      const hover =
        this.variant === "feature" && this.hovered
          ? "bg-secondary/40"
          : "";
      return [base, variants[this.variant] || variants.default, hover]
        .filter(Boolean)
        .join(" ");
    },
  }),

  navItem: (label = "", href = "#", active = false) => ({
    label,
    href,
    active,
    hovered: false,
    classes() {
      const base =
        "px-4 py-2 text-xs font-semibold rounded-md transition select-none cursor-pointer inline-block";
      if (this.active)
        return [base, "text-foreground bg-secondary font-bold"].join(" ");
      return [
        base,
        "text-muted-foreground hover:text-foreground hover:bg-secondary",
      ].join(" ");
    },
  }),

  brand: (size = "md") => ({
    size,
    containerClasses() {
      const base =
        "group flex items-center gap-3 rounded-md hover:bg-secondary transition select-none";
      const sizes = {
        sm: "py-1.5 px-3",
        md: "py-2 px-4",
        lg: "py-2.5 px-5",
      };
      return [base, sizes[this.size] || sizes.md].join(" ");
    },
    avatarClasses() {
      const sizes = {
        sm: "h-6 w-6 text-[10px]",
        md: "h-8 w-8 text-xs",
        lg: "h-10 w-10 text-sm",
      };
      return [
        "rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground group-hover:scale-105 transition-transform",
        sizes[this.size] || sizes.md,
      ].join(" ");
    },
  }),

  // ----- DOMAIN -----

  themeToggle: () => ({
    isDark: false,
    toggle() {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle("dark", this.isDark);
      try {
        localStorage.setItem("cozyspace-theme", this.isDark ? "dark" : "light");
      } catch (_) {}
    },
    init() {
      try {
        const saved = localStorage.getItem("cozyspace-theme");
        if (saved === "dark") {
          this.isDark = true;
          document.documentElement.classList.add("dark");
        }
      } catch (_) {}
    },
  }),

  featureCard: (number = "00", title = "", body = "") => ({
    number,
    title,
    body,
    hovered: false,
    classes() {
      return [
        "group rounded-lg p-8 transition duration-300 cursor-default",
        this.hovered
          ? "bg-secondary/40"
          : "bg-transparent hover:bg-secondary/40",
      ].join(" ");
    },
    avatarClasses() {
      return [
        "h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs text-foreground mb-4 transition-transform",
        this.hovered ? "scale-105" : "",
      ].join(" ");
    },
  }),
};
