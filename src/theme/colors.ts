export const colors = {
  // Base Palette provided by user
  palette: {
    coral: '#FF644B',
    lightGray: '#EBEBEB',
    white: '#FFFFFF',
    borderGray: '#CDCDCD',
    mediumGray: '#666666',
    overlayBlack: '#00000040',
  },

  // Semantic Tokens (Light Mode)
  light: {
    primary: {
      main: '#FF644B',
      hover: '#E54E36',
      light: '#FFF0ED',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#666666',
      hover: '#4D4D4D',
      light: '#EBEBEB',
      contrastText: '#FFFFFF',
    },
    background: {
      app: '#EBEBEB',
      surface: '#FFFFFF',
      hover: '#E0E0E0',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#CDCDCD',
      inverse: '#FFFFFF',
    },
    border: {
      main: '#CDCDCD',
      hover: '#B8B8B8',
    },
    overlay: '#00000040',
  },

  // Semantic Tokens (Dark Mode)
  dark: {
    primary: {
      main: '#FF644B',
      hover: '#FF7B64',
      light: '#4A1A12',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#666666',
      hover: '#4D4D4D',
      light: '#2A2A2A',
      contrastText: '#FFFFFF',
    },
    background: {
      app: '#121212',
      surface: '#1E1E1E',
      hover: '#2A2A2A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      disabled: '#4D4D4D',
      inverse: '#000000',
    },
    border: {
      main: '#333333',
      hover: '#4D4D4D',
    },
    overlay: '#00000080',
  },
} as const;

export type ColorsTheme = typeof colors;
