import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAudio } from './AudioManager'

const Button = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: white;
  color: #FF6B6B;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background-color: #f8f8f8;
  }

  &:active {
    transform: translateY(0);
  }
`

interface BackButtonProps {
  to: string
  message?: string
}

export function BackButton({ to, message = 'Voltando' }: BackButtonProps) {
  const navigate = useNavigate()
  const { playAudio } = useAudio()

  const handleClick = () => {
    if (message) {
      playAudio(message)
    }
    setTimeout(() => {
      navigate(to)
    }, 200)
  }

  return (
    <Button onClick={handleClick}>
      ← Voltar
    </Button>
  )
} 