import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useAudio } from './AudioManager'

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const Letter = styled.div`
  font-size: 2.8rem;
  font-weight: bold;
  color: #FF6B6B;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  font-family: 'Comic Sans MS', cursive, sans-serif;
  transition: all 0.3s ease;
`

const Container = styled.div<{ $isActive: boolean }>`
  background: ${props => props.$isActive ? '#FFE5E5' : 'white'};
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  animation: ${props => props.$isActive ? pulse : 'none'} 1s infinite;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);

    &:before {
      left: 100%;
    }

    ${Letter} {
      animation: ${bounce} 0.5s ease;
    }
  }

  &:active {
    transform: scale(0.95);
  }
`

const Name = styled.div`
  font-size: 1.4rem;
  color: #666;
  margin: 0.5rem 0;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`

const Phonetic = styled.div`
  font-size: 1.1rem;
  color: #888;
  background: #F8F9FA;
  padding: 0.3rem 0.8rem;
  border-radius: 10px;
  font-family: monospace;
  opacity: 0.8;
`

const Example = styled.div`
  font-size: 1.2rem;
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`

const SoundIcon = styled.div<{ $isPlaying: boolean }>`
  color: ${props => props.$isPlaying ? '#FF6B6B' : '#999'};
  font-size: 1.5rem;
  margin-top: 0.5rem;
  animation: ${props => props.$isPlaying ? pulse : 'none'} 1s infinite;
  
  &:before {
    content: '🔊';
  }

  &:hover {
    transform: scale(1.1);
  }
`

export interface PhoneticCardProps {
  letter: string
  phonetic: string
  example?: string
  name?: string
  onClick?: () => void
  isPlaying?: boolean
  isActive?: boolean
}

export function PhoneticCard({
  letter,
  phonetic,
  example,
  name,
  onClick,
  isPlaying = false,
  isActive = false
}: PhoneticCardProps) {
  const { playAudio } = useAudio()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (name) {
      playAudio(name)
    }
  }

  return (
    <Container onClick={handleClick} $isActive={isActive}>
      <Letter>{letter}</Letter>
      {name && <Name>{name}</Name>}
      <Phonetic>{phonetic}</Phonetic>
      {example && <Example>{example}</Example>}
      <SoundIcon $isPlaying={isPlaying} />
    </Container>
  )
} 