import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface AudioContextType {
  playAudio: (text: string) => void
  stopAudio: () => void
  setVolume: (volume: number) => void
  isPlaying: boolean
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(1)
  const [synthesis] = useState(() => window.speechSynthesis)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  // Função para carregar as vozes
  const loadVoices = useCallback(() => {
    const availableVoices = synthesis.getVoices()
    console.log('Vozes disponíveis:', availableVoices.map(v => `${v.name} (${v.lang})`))
    setVoices(availableVoices)
  }, [synthesis])

  useEffect(() => {
    // Carrega as vozes inicialmente
    loadVoices()

    // Adiciona o evento para quando as vozes estiverem disponíveis
    synthesis.addEventListener('voiceschanged', loadVoices)

    // Remove o evento quando o componente for desmontado
    return () => {
      synthesis.removeEventListener('voiceschanged', loadVoices)
    }
  }, [synthesis, loadVoices])

  const getPortugueseVoice = useCallback(() => {
    // Tenta encontrar uma voz em português do Brasil
    const brVoice = voices.find(voice => voice.lang === 'pt-BR')
    if (brVoice) {
      console.log('Usando voz pt-BR:', brVoice.name)
      return brVoice
    }

    // Se não encontrar pt-BR, tenta encontrar qualquer voz em português
    const ptVoice = voices.find(voice => voice.lang.startsWith('pt'))
    if (ptVoice) {
      console.log('Usando voz pt:', ptVoice.name)
      return ptVoice
    }

    // Se não encontrar nenhuma voz em português, usa a primeira voz disponível
    console.log('Usando voz padrão:', voices[0]?.name)
    return voices[0]
  }, [voices])

  const playAudio = useCallback((text: string) => {
    stopAudio()

    // Garante que o texto não está vazio
    if (!text.trim()) {
      console.warn('Tentativa de reproduzir texto vazio')
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.volume = volume
    utterance.rate = 0.9 // Um pouco mais lento para melhor compreensão
    utterance.pitch = 1
    utterance.lang = 'pt-BR' // Força o uso do português do Brasil
    
    const voice = getPortugueseVoice()
    if (voice) {
      utterance.voice = voice
    }
    
    utterance.onstart = () => {
      console.log('Iniciando áudio:', text)
      setIsPlaying(true)
    }
    
    utterance.onend = () => {
      console.log('Áudio finalizado:', text)
      setIsPlaying(false)
    }
    
    utterance.onerror = (event) => {
      console.error('Erro na síntese de voz:', event)
      setIsPlaying(false)
    }

    synthesis.speak(utterance)
  }, [synthesis, volume, getPortugueseVoice])

  const stopAudio = useCallback(() => {
    synthesis.cancel()
    setIsPlaying(false)
  }, [synthesis])

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume)
  }, [])

  // Limpa qualquer áudio em reprodução quando o componente for desmontado
  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [stopAudio])

  return (
    <AudioContext.Provider value={{ playAudio, stopAudio, setVolume, isPlaying }}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
} 