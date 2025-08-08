/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Ensure flowork colors are always included in build
    'text-flowork-50', 'text-flowork-100', 'text-flowork-200', 'text-flowork-300', 'text-flowork-400', 
    'text-flowork-500', 'text-flowork-600', 'text-flowork-700', 'text-flowork-800', 'text-flowork-900',
    'bg-flowork-50', 'bg-flowork-100', 'bg-flowork-200', 'bg-flowork-300', 'bg-flowork-400',
    'bg-flowork-500', 'bg-flowork-600', 'bg-flowork-700', 'bg-flowork-800', 'bg-flowork-900',
    'border-flowork-50', 'border-flowork-100', 'border-flowork-200', 'border-flowork-300', 'border-flowork-400',
    'border-flowork-500', 'border-flowork-600', 'border-flowork-700', 'border-flowork-800', 'border-flowork-900',
    'hover:bg-flowork-400', 'hover:bg-flowork-500', 'hover:bg-flowork-600', 'hover:text-flowork-600',
    'focus:ring-flowork-400', 'focus:border-flowork-400'
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
        // Custom Flowork brand colors
        flowork: {
          '50': '#DDECF6',   // Very light blue - backgrounds, subtle accents
          '100': '#C5DDF0',  // Interpolated for better gradient
          '200': '#9BCBE5',  // Light blue - hover states, light elements  
          '300': '#7DB7D5',  // Interpolated for smoother transitions
          '400': '#5BA3C6',  // Medium blue - primary elements, buttons
          '500': '#4C91B2',  // Interpolated between 400 and 600
          '600': '#387EA2',  // Dark blue - text, active states
          '700': '#2A6685',  // Interpolated for more granular control
          '800': '#184E6F',  // Very dark blue - headings, emphasis
          '900': '#123A52',  // Even darker for maximum contrast
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