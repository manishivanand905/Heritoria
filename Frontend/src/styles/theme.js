export const theme = {
  colors: {
    // Primary Colors (Buttons)
    primary: "#197663",
    primaryDark: "#145a4f",
    primaryLight: "#29a35c",

    // Secondary Colors
    secondary: "#67777E",
    secondaryLight: "#29a35c",

    // Accent Colors
    accent: "#ECAB13",
    accentLight: "#ECAB131A",

    // WhatsApp
    whatsapp: "#25d366",
    whatsappDark: "#20ba5a",

    // Neutral Colors
    white: "#ffffff",
    black: "#000000",
    text: "#67777E",
    textLight: "#29a35c",
    textDark: "#1a252f",

    // Background Colors
    background: "#F4F1EB4C",
    backgroundLight: "#ECAB131A",
    backgroundDark: "#1a1a2e",

    // Gray Scale
    gray: "#67777E",
    lightGray: "#F4F1EB4C",
    darkGray: "#67777E",

    // Border
    border: "#e0e0e0",
    borderLight: "#f0f0f0",

    // Status Colors
    success: "#197663",
    warning: "#ECAB13",
    error: "#e74c3c",
    info: "#29a35c",
  },

  // Typography
  fonts: {
    primary:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    heading: "'Poppins', 'Inter', sans-serif",
    mono: "'Fira Code', 'Courier New', monospace",
  },

  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Spacing
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
    "4xl": "6rem", // 96px
    "5xl": "8rem", // 128px
  },

  // Border Radius
  borderRadius: {
    none: "0",
    sm: "0.25rem", // 4px
    base: "0.5rem", // 8px
    md: "0.75rem", // 12px
    lg: "1rem", // 16px
    xl: "1.5rem", // 24px
    "2xl": "2rem", // 32px
    full: "9999px",
  },

  // Shadows
  shadows: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    primary: "0 4px 12px rgba(25, 118, 99, 0.3)",
    primaryLg: "0 6px 20px rgba(25, 118, 99, 0.4)",
  },

  // Transitions
  transitions: {
    fast: "150ms ease",
    base: "300ms ease",
    slow: "500ms ease",
    allFast: "all 150ms ease",
    allBase: "all 300ms ease",
    allSlow: "all 500ms ease",
  },

  // Z-index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // Breakpoints
  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Media Queries
  media: {
    xs: "@media (max-width: 480px)",
    sm: "@media (max-width: 640px)",
    md: "@media (max-width: 768px)",
    lg: "@media (max-width: 1024px)",
    xl: "@media (max-width: 1280px)",
    "2xl": "@media (max-width: 1536px)",
  },
};
