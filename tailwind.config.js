/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray.100'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.gray.300'),
            '--tw-prose-links': theme('colors.sky.400'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray.400'),
            '--tw-prose-bullets': theme('colors.gray.400'),
            '--tw-prose-hr': theme('colors.gray.600'),
            '--tw-prose-quotes': theme('colors.gray.300'),
            '--tw-prose-quote-borders': theme('colors.sky.500'),
            '--tw-prose-captions': theme('colors.gray.400'),
            '--tw-prose-code': theme('colors.sky.300'),
            '--tw-prose-pre-code': theme('colors.gray.100'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 0.5)',
            '--tw-prose-th-borders': theme('colors.gray.600'),
            '--tw-prose-td-borders': theme('colors.gray.600'),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}