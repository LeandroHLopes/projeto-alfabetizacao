import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../components/AudioManager'
import { BackButton } from '../components/BackButton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #FFC3A0, #FFAFBD);
  padding: 20px;
`

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  text-align: center;
`

const LevelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 800px;
  width: 100%;
  padding: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const LevelButton = styled.button<{ $color: string; $hoverColor: string }>`
  padding: 2rem;
  font-size: 1.8rem;
  background-color: ${props => props.$color};
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.$hoverColor};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`

const levels = [
  { path: 'letras', name: 'Letras', color: '#4CAF50', hoverColor: '#45a049' },
  { path: 'silabas', name: 'Sílabas', color: '#2196F3', hoverColor: '#1976D2' },
  { path: 'palavras', name: 'Palavras', color: '#FF9800', hoverColor: '#F57C00' },
  { path: 'frases', name: 'Frases', color: '#9C27B0', hoverColor: '#7B1FA2' }
]

export function LevelSelection() {
  const navigate = useNavigate()
  const { playAudio } = useAudio()

  React.useEffect(() => {
    playAudio('Escolha um nível: Letras, Sílabas, Palavras ou Frases')
  }, [playAudio])

  const handleLevelSelect = (level: string) => {
    setTimeout(() => {
      navigate(`/game/${level}`)
    }, 200)
  }

  return (
    <Container>
      <BackButton to="/" message="Voltando para a tela inicial" />
      <Title>Escolha um Nível</Title>
      <LevelsGrid>
        {levels.map(level => (
          <LevelButton 
            key={level.path}
            $color={level.color}
            $hoverColor={level.hoverColor}
            onClick={() => handleLevelSelect(level.path)}
          >
            {level.name}
          </LevelButton>
        ))}
      </LevelsGrid>
    </Container>
  )
} 