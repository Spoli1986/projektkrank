import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        logo: 'url(/Logo ohne Hintergrund.png)',
        aufbruch: 'url("https://i.postimg.cc/mrvxKv1X/cover.png")',
      },
      colors: {
        'grey-black': 'rgba(31, 41, 55)',
        'pk-green': '#51de0b',
        'pk-gold': '#d5a14a',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(81, 222, 11, 0.24), 0 20px 70px rgba(81, 222, 11, 0.12)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        projektkrank: {
          primary: '#51de0b',
          secondary: '#d5a14a',
          accent: '#9cf56f',
          neutral: '#171c17',
          'base-100': '#0b0e0b',
          'base-200': '#111511',
          'base-300': '#1b211b',
          'base-content': '#f4f7f2',
          info: '#83b8ff',
          success: '#51de0b',
          warning: '#d5a14a',
          error: '#ff6b6b',
        },
      },
    ],
  },
};
export default config;
