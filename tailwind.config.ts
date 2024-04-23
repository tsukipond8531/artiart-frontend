import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      'xl-h1': '48px',
      'xl-h2': '46px',
      'xl-h3': '32px',
      'xl-h4': '28px',
      'xl-h5': '26px',
      'xl-h6': '18px',
      'lg-h1': '36px',
      'lg-h2': '32px',
      'lg-h3': '28px',
      'lg-h4': '24px',
      'lg-h5': '20px',
      'lg-h6': '16px',
      'md-h1': '30px',
      'md-h2': '28px',
      'md-h3': '22px',
      'md-h4': '20px',
      'md-h5': '18px',
      'md-h6': '16px',
      '18': '18px',
      '16': '16px',
      '14': '14px',
      '12': '12px',
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'video': "url('/assets/images/0423.mp4')",
       
      },
    },
  },
  plugins: [],
};
export default config;
