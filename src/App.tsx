import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Home } from './scenes/Home'
import { Game } from './scenes/Game'
import { LevelSelection } from './scenes/LevelSelection'

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #FFC3A0, #FFAFBD);
  text-align: center;
  color: white;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  button {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    background-color: white;
    color: #FF6B6B;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      background-color: #f8f8f8;
    }

    &:active {
      transform: translateY(0);
    }
  }
`

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <NotFound>
      <h1>Página não encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <button onClick={() => navigate('/levels')}>Voltar para o Jogo</button>
    </NotFound>
  )
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:level" element={<Game />} />
        <Route path="/levels" element={<LevelSelection />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
} 