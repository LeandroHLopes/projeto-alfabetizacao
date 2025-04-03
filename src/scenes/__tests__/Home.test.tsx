import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Home } from '../Home'

describe('Home', () => {
  it('deve renderizar o título e o botão', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(screen.getByText('Jogo da Alfabetização')).toBeInTheDocument()
    expect(screen.getByText('Começar a Jogar')).toBeInTheDocument()
  })

  it('deve navegar para a página de níveis quando o botão for clicado', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    const button = screen.getByText('Começar a Jogar')
    fireEvent.click(button)

    expect(window.location.pathname).toBe('/levels')
  })
}) 