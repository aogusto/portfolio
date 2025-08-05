import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        default: '5px 5px 0 var(--shadow)',
        full: '0 0 0 12px var(--shadow)',
        glow: '0 0 20px rgba(124, 119, 198, 0.3)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        shadow: 'var(--shadow)',
        // Cores adicionais para harmonia com o background
        'purple-light': '#9d97d1',
        'blue-deep': '#1a1a2e',
        'cyan-bright': '#78dbff',
        'purple-glow': '#ff77c6',
      },
    },
  },
  plugins: [],
};
export default config;
