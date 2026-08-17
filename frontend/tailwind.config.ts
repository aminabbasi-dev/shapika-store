// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // استفاده از کلاس .dark برای تم تاریک
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      backgroundImage: {
        // گرادیانت برای حالت روشن
        "gradient-light":
          "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--accent)) 100%)",
        // گرادیانت برای حالت تاریک
        "gradient-dark":
          "linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--primary)) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
