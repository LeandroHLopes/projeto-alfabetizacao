import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }

  body {
    font-family: 'Comic Neue', cursive;
    line-height: 1.5;
    background-color: #f5f5f5;
    color: #333;
    overflow-x: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  button {
    font-family: 'Comic Neue', cursive;
    cursor: pointer;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Melhorias de acessibilidade */
  :focus {
    outline: 3px solid #2196F3;
    outline-offset: 2px;
  }

  /* Preferências de movimento reduzido */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Melhorias para dispositivos móveis */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
` 