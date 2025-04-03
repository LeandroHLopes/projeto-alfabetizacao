import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      background: string
      text: string
      warning: string
      error: string
      success: string
    }
    fonts: {
      primary: string
      secondary: string
    }
  }
} 