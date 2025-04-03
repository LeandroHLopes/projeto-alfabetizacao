import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAudio } from '../components/AudioManager'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
  padding: 20px;
  text-align: center;
`

const Title = styled.h1`
  font-size: 3.5rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
`

const StartButton = styled.button`
  padding: 1.5rem 3rem;
  font-size: 1.8rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background-color: #45a049;
  }

  &:active {
    transform: translateY(0);
  }
`

const Description = styled.p`
  font-size: 1.5rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 3rem;
  max-width: 800px;
`

export function Home() {
  const navigate = useNavigate()
  const { playAudio } = useAudio()

  useEffect(() => {
    playAudio('Bem-vindo ao Jogo da Alfabetização! Clique no botão para começar.')
  }, [playAudio])

  const handleStart = () => {
    playAudio('Vamos escolher um nível para começar!')
    setTimeout(() => {
      navigate('/levels')
    }, 200)
  }

  return (
    <Container>
      <Title>Jogo da Alfabetização</Title>
      <Description>
        Venha aprender a ler e escrever de uma forma divertida!
        Escolha um nível e embarque nessa aventura.
      </Description>
      <StartButton onClick={handleStart}>
        Começar a Jogar
      </StartButton>
    </Container>
  )
} 