/** Tailwind compilado localmente para o APK (funciona offline, sem o CDN).
 *  Mesmo tema "Tactical Esports Deck" usado no index.html da versão web. */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js}',
    '../js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8ed5ff',
        'on-primary': '#00354a',
        'primary-container': '#38bdf8',
        'on-primary-container': '#004966',
        'secondary': '#ffb95f',
        'on-secondary': '#472a00',
        'secondary-container': '#ee9800',
        'on-secondary-container': '#543200',
        'tertiary': '#56e5a9',
        'on-tertiary': '#003824',
        'tertiary-container': '#30c88f',
        'on-tertiary-fixed': '#002113',
        'error': '#ffb4ab',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',
        'background': '#0d1322',
        'on-background': '#dde2f7',
        'surface': '#0d1322',
        'surface-dim': '#0d1322',
        'surface-bright': '#333949',
        'surface-container-lowest': '#080e1d',
        'surface-container-low': '#151b2b',
        'surface-container': '#191f2f',
        'surface-container-high': '#242a3a',
        'surface-container-highest': '#2f3445',
        'on-surface': '#dde2f7',
        'on-surface-variant': '#bdc8d1',
        'outline': '#87929a',
        'outline-variant': '#3e4850'
      },
      fontFamily: {
        'headline': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'label-sm': ['JetBrains Mono', 'monospace']
      },
      spacing: {
        'space-xs': '0.375rem',
        'space-sm': '0.625rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2rem'
      },
      fontSize: {
        'display-lg': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-md': ['1.25rem', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '700' }],
        'title-sm': ['0.9375rem', { lineHeight: '1.35', fontWeight: '600' }],
        'body-md': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label-sm': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.03em', fontWeight: '600' }]
      }
    }
  }
};
