﻿// filepath: automotive-salah/apps/admin/tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],

  content: [
    "./pages/**/*.{ts,tsx}",

    "./components/**/*.{ts,tsx}",

    "./app/**/*.{ts,tsx}",

    "./src/**/*.{ts,tsx}",

    "../../packages/ui/**/*.{ts,tsx}",
  ],

  prefix: "",

  theme: {
    container: {
      center: true,

      padding: "2rem",

      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      colors: {
        border: "hsl(var(--border))",

        input: "hsl(var(--input))",

        ring: "hsl(var(--ring))",

        background: "hsl(var(--background))",

        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",

          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",

          foreground: "hsl(var(--secondary-foreground))",
        },

        admin: {
          50: "#f0f9ff",

          500: "#3b82f6",

          600: "#2563eb",

          700: "#1d4ed8",
        },
      },

      borderRadius: {
        lg: "var(--radius)",

        md: "calc(var(--radius) - 2px)",

        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
