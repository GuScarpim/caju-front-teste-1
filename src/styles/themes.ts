const themeMain = {
  colors: {
    primary: '#64a98c',
    primaryAlternative: '#9be59b',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#666666',
    grayLight: '#CCCCCC',
    ice: '#F0F0F0',
    iceAlternative: '#FDF8E9',
    error: '#e80537',
    errorAlternative: '#ff919a',
    alert: '#9C791D',
    alertAlternative: '#FF8858',
    secondary: '#4242DF',
    secondaryAlternative: '#EEEEFD',
    tertiary: '#CE2893',
    tertiaryAlternative: '#FBEDF6',
  },
  gradient: {
    primary: 'linear-gradient(258deg, #ff7500 8%, #e80537 53%)'
  },
  font: {
    size: {
      nano: '0.625rem', // 10px
      small: '0.75rem', // 12px
      regular: '0.875rem', // 14px
      medium: '1rem', // 16px
      large: '1.125rem', // 18px
      extra_large: '1.375rem', // 22px
      super_large: '1.5rem', // 24px
      mega: '1.625rem', // 26px
      extra_mega: '1.75rem', // 28px
      ultra_large: '1.875rem', // 30px
      jumbo: '2rem', // 32px
      extra_jumbo: '2.125rem', // 34px
      ultra_jumbo: '2.25rem', // 36px
      gigantic: '2.5rem', // 40px
      extra_gigantic: '4.25rem' // 68px
    },
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800
    },
  },
  spacing: {
    none: '0px',
    xsmall: '4px',
    small: '8px',
    medium: '10px',
    regular: '16px',
    large: '20px',
    xlarge: '24px',
    xxlarge: '40px',
    xxxlarge: '48px'
  },
  border: {
    radius: {
      small: '4px',
      medium: '8px',
      large: '24px',
      extraLarge: '32px',
      ultraLarge: '36px',
      circle: '50%',
      full: '100%'
    }
  }
};

const buttonThemes = {
  REVIEW: {
    background: themeMain.colors.iceAlternative,
    title: themeMain.colors.alert,
  },
  APPROVED: {
    background: themeMain.colors.secondaryAlternative,
    title: themeMain.colors.secondary,
  },
  REPROVED: {
    background: themeMain.colors.tertiaryAlternative,
    title: themeMain.colors.tertiary,
  },
};

export type MyTheme = typeof themeMain;

export { themeMain, buttonThemes };