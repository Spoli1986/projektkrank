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
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'dancing-script': ['Dancing Script', 'cursive'],
        'f-grotesk': ['Familjen Grotesk', 'sans-serif'],
        chakra: ["'Chakra Petch', sans-serif"],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: '#f4aa3a',
          secondary: '#f4f4a1',
          accent: '#1be885',
          neutral: '#272136',
          'base-100': '#ffffff',
          info: '#778ad4',
          success: '#23b893',
          warning: '#f79926',
          error: '#ea535a',
        },
      },
    ],
  },
};
export default config;
