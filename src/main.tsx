import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ThemeProvider } from 'styled-components'
import { AudioProvider } from './components/AudioManager'
import { GlobalStyles } from './styles/GlobalStyles'

const theme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#F7F7F7',
    text: '#333333',
    warning: '#FFB900',
    error: '#FF4444',
    success: '#00C851'
  },
  fonts: {
    primary: "'Roboto', sans-serif",
    secondary: "'Roboto', sans-serif"
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AudioProvider>
        <GlobalStyles />
        <App />
      </AudioProvider>
    </ThemeProvider>
  </React.StrictMode>
) 