import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    list-style: none;
  }

  input, textarea, select {
    font-family: inherit;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .scroll-float-target {
      opacity: 0;
      transform: translate3d(0, 34px, 0) scale(0.985);
      filter: blur(10px);
      transition:
        opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.85s cubic-bezier(0.22, 1, 0.36, 1),
        filter 0.75s cubic-bezier(0.22, 1, 0.36, 1);
      transition-delay: var(--scroll-float-delay, 0ms);
      will-change: opacity, transform, filter;
    }

    .scroll-float-target.scroll-float-in {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
      filter: blur(0);
    }
  }

  /* Selection */
  ::selection {
    background: ${(props) => props.theme.colors.primary};
    color: #ffffff;
  }

  ::-moz-selection {
    background: ${(props) => props.theme.colors.primary};
    color: #ffffff;
  }
`;
