import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { useAudio } from '../components/AudioManager'
import { BackButton } from '../components/BackButton'
import { PhoneticCard } from '../components/PhoneticCard'
import { alphabet, vowels, consonants } from '../utils/phoneticData'

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #FFC3A0, #FFAFBD);
  padding: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`

const Title = styled.h1`
  font-size: 3.5rem;
  color: white;
  text-shadow: 
    3px 3px 0 #FF6B6B,
    6px 6px 0 rgba(0, 0, 0, 0.2);
  margin: 2rem 0;
  text-align: center;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
`

const Section = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h2 {
    color: white;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    position: relative;
    
    &:after {
      content: '';
      display: block;
      width: 100px;
      height: 4px;
      background: #FF6B6B;
      margin: 10px auto;
      border-radius: 2px;
    }
  }
`

const Card = styled.button`
  background-color: white;
  border: none;
  border-radius: 15px;
  padding: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

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
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);

    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const SyllableGroup = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 1rem;

  h3 {
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
  }
`

const PhraseCard = styled(Card)`
  background: white;
  font-size: 1.8rem;
  width: 100%;
  text-align: left;
  padding: 2rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 2rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  border-left: 8px solid #FF6B6B;
  transition: all 0.3s ease;

  &:hover {
    border-left: 8px solid #FFB6B6;
    background: #FFF5F5;
  }

  &:active {
    transform: scale(0.99);
  }
`

const PhraseIcon = styled.span<{ $isActive: boolean }>`
  font-size: 2.5rem;
  opacity: ${props => props.$isActive ? 1 : 0.6};
  animation: ${props => props.$isActive ? pulse : 'none'} 1s infinite;
`

const PhraseText = styled.span`
  flex: 1;
  line-height: 1.4;
  color: #444;
`

const SoundIcon = styled.span<{ $isPlaying: boolean }>`
  font-size: 2rem;
  opacity: ${props => props.$isPlaying ? 1 : 0.6};
`

const silabasTranscricao = {
  'B': {
    silabas: ['BA', 'BE', 'BI', 'BO', 'BU'],
    fonetica: ['[ba]', '[bɛ]', '[bi]', '[bɔ]', '[bu]']
  },
  'C': {
    silabas: ['CA', 'CE', 'CI', 'CO', 'CU'],
    fonetica: ['[ka]', '[sɛ]', '[si]', '[kɔ]', '[ku]']
  },
  'D': {
    silabas: ['DA', 'DE', 'DI', 'DO', 'DU'],
    fonetica: ['[da]', '[dɛ]', '[dʒi]', '[dɔ]', '[du]']
  },
  'F': {
    silabas: ['FA', 'FE', 'FI', 'FO', 'FU'],
    fonetica: ['[fa]', '[fɛ]', '[fi]', '[fɔ]', '[fu]']
  },
  'G': {
    silabas: ['GA', 'GE', 'GI', 'GO', 'GU'],
    fonetica: ['[ga]', '[ʒɛ]', '[ʒi]', '[gɔ]', '[gu]']
  },
  'J': {
    silabas: ['JA', 'JE', 'JI', 'JO', 'JU'],
    fonetica: ['[ʒa]', '[ʒɛ]', '[ʒi]', '[ʒɔ]', '[ʒu]']
  },
  'L': {
    silabas: ['LA', 'LE', 'LI', 'LO', 'LU'],
    fonetica: ['[la]', '[lɛ]', '[li]', '[lɔ]', '[lu]']
  },
  'M': {
    silabas: ['MA', 'ME', 'MI', 'MO', 'MU'],
    fonetica: ['[ma]', '[mɛ]', '[mi]', '[mɔ]', '[mu]']
  },
  'N': {
    silabas: ['NA', 'NE', 'NI', 'NO', 'NU'],
    fonetica: ['[na]', '[nɛ]', '[ni]', '[nɔ]', '[nu]']
  },
  'P': {
    silabas: ['PA', 'PE', 'PI', 'PO', 'PU'],
    fonetica: ['[pa]', '[pɛ]', '[pi]', '[pɔ]', '[pu]']
  },
  'R': {
    silabas: ['RA', 'RE', 'RI', 'RO', 'RU'],
    fonetica: ['[ʁa]', '[ʁɛ]', '[ʁi]', '[ʁɔ]', '[ʁu]']
  },
  'S': {
    silabas: ['SA', 'SE', 'SI', 'SO', 'SU'],
    fonetica: ['[sa]', '[sɛ]', '[si]', '[sɔ]', '[su]']
  },
  'T': {
    silabas: ['TA', 'TE', 'TI', 'TO', 'TU'],
    fonetica: ['[ta]', '[tɛ]', '[tʃi]', '[tɔ]', '[tu]']
  },
  'V': {
    silabas: ['VA', 'VE', 'VI', 'VO', 'VU'],
    fonetica: ['[va]', '[vɛ]', '[vi]', '[vɔ]', '[vu]']
  },
  'X': {
    silabas: ['XA', 'XE', 'XI', 'XO', 'XU'],
    fonetica: ['[ʃa]', '[ʃɛ]', '[ʃi]', '[ʃɔ]', '[ʃu]']
  },
  'Z': {
    silabas: ['ZA', 'ZE', 'ZI', 'ZO', 'ZU'],
    fonetica: ['[za]', '[zɛ]', '[zi]', '[zɔ]', '[zu]']
  }
}

const palavrasComFonetica = {
  'A': {
    'ABACAXI': '[a.ba.ka.ʃi]',
    'ABELHA': '[a.ˈbe.ʎa]',
    'AVIÃO': '[a.vi.ˈãw]',
    'ÁRVORE': '[ˈaʁ.vo.ɾi]',
    'AMIGO': '[a.ˈmi.gu]'
  },
  'B': {
    'BOLA': '[ˈbɔ.la]',
    'BARCO': '[ˈbaʁ.ku]',
    'BONECA': '[bo.ˈnɛ.ka]',
    'BORBOLETA': '[boʁ.bo.ˈle.ta]',
    'BANANA': '[ba.ˈnã.na]'
  },
  'C': {
    'CASA': '[ˈka.za]',
    'CARRO': '[ˈka.ʁu]',
    'COELHO': '[ko.ˈe.ʎu]',
    'CACHORRO': '[ka.ˈʃo.ʁu]',
    'CHUVA': '[ˈʃu.va]'
  },
  'D': {
    'DADO': '[ˈda.du]',
    'DENTE': '[ˈdẽ.tʃi]',
    'DOCE': '[ˈdo.si]',
    'DRAGÃO': '[dɾa.ˈgãw]',
    'DANÇAR': '[dã.ˈsaʁ]'
  },
  'E': {
    'ESCOLA': '[is.ˈkɔ.la]',
    'ESTRELA': '[is.ˈtɾe.la]',
    'ELEFANTE': '[e.le.ˈfã.tʃi]',
    'ESPELHO': '[is.ˈpe.ʎu]',
    'ESCADA': '[is.ˈka.da]'
  },
  'F': {
    'FADA': '[ˈfa.da]',
    'FLOR': '[ˈfloʁ]',
    'FOGO': '[ˈfo.gu]',
    'FORMIGA': '[foʁ.ˈmi.ga]',
    'FESTA': '[ˈfɛs.ta]'
  },
  'G': {
    'GATO': '[ˈga.tu]',
    'GIRAFA': '[ʒi.ˈɾa.fa]',
    'GELADO': '[ʒe.ˈla.du]',
    'GALINHA': '[ga.ˈlĩ.ɲa]',
    'GUITARRA': '[gi.ˈta.ʁa]'
  },
  'I': {
    'ILHA': '[ˈi.ʎa]',
    'IGREJA': '[i.ˈgɾe.ʒa]',
    'ÍNDIO': '[ˈĩ.dʒiu]',
    'IRMÃO': '[iʁ.ˈmãw]',
    'IGUANA': '[i.gu.ˈã.na]'
  },
  'J': {
    'JANELA': '[ʒa.ˈnɛ.la]',
    'JACARÉ': '[ʒa.ka.ˈɾɛ]',
    'JOGO': '[ˈʒo.gu]',
    'JARDIM': '[ʒaʁ.ˈdʒĩ]',
    'JOELHO': '[ʒo.ˈe.ʎu]'
  },
  'L': {
    'LEÃO': '[le.ˈãw]',
    'LIVRO': '[ˈli.vɾu]',
    'LOBO': '[ˈlo.bu]',
    'LÁPIS': '[ˈla.pis]',
    'LUA': '[ˈlu.a]'
  },
  'M': {
    'MALA': '[ˈma.la]',
    'MACACO': '[ma.ˈka.ku]',
    'MENINA': '[me.ˈni.na]',
    'MÚSICA': '[ˈmu.zi.ka]',
    'MAÇÃ': '[ma.ˈsã]'
  },
  'N': {
    'NAVIO': '[na.ˈvi.u]',
    'NUVEM': '[ˈnu.vẽj]',
    'NEVE': '[ˈnɛ.vi]',
    'NARIZ': '[na.ˈɾis]',
    'NOITE': '[ˈnoj.tʃi]'
  },
  'O': {
    'ÓCULOS': '[ˈɔ.ku.lus]',
    'OVELHA': '[o.ˈve.ʎa]',
    'ONDA': '[ˈõ.da]',
    'OLHO': '[ˈo.ʎu]',
    'OURO': '[ˈow.ɾu]'
  },
  'P': {
    'PATO': '[ˈpa.tu]',
    'PEIXE': '[ˈpej.ʃi]',
    'PORTA': '[ˈpɔʁ.ta]',
    'PALHAÇO': '[pa.ˈʎa.su]',
    'PÁSSARO': '[ˈpa.sa.ɾu]'
  },
  'Q': {
    'QUEIJO': '[ˈkej.ʒu]',
    'QUADRO': '[ˈkwa.dɾu]',
    'QUENTE': '[ˈkẽ.tʃi]',
    'QUINTAL': '[kĩ.ˈtaw]',
    'QUATRO': '[ˈkwa.tɾu]'
  },
  'R': {
    'RATO': '[ˈʁa.tu]',
    'ROSA': '[ˈʁɔ.za]',
    'RODA': '[ˈʁɔ.da]',
    'RELÓGIO': '[ʁe.ˈlɔ.ʒiu]',
    'RÁDIO': '[ˈʁa.dʒiu]'
  },
  'S': {
    'SAPO': '[ˈsa.pu]',
    'SAPATO': '[sa.ˈpa.tu]',
    'SOL': '[ˈsɔw]',
    'SORRISO': '[so.ˈʁi.zu]',
    'SORVETE': '[soʁ.ˈve.tʃi]'
  },
  'T': {
    'TATU': '[ta.ˈtu]',
    'TREM': '[ˈtɾẽj]',
    'TIGRE': '[ˈtʃi.gɾi]',
    'TELEFONE': '[te.le.ˈfõ.ni]',
    'TARTARUGA': '[taʁ.ta.ˈɾu.ga]'
  },
  'U': {
    'UVA': '[ˈu.va]',
    'URSO': '[ˈuʁ.su]',
    'UNHA': '[ˈũ.ɲa]',
    'UNIVERSO': '[u.ni.ˈvɛʁ.su]',
    'URUBU': '[u.ɾu.ˈbu]'
  },
  'V': {
    'VACA': '[ˈva.ka]',
    'VELA': '[ˈvɛ.la]',
    'VIOLÃO': '[vi.o.ˈlãw]',
    'VASSOURA': '[va.ˈso.ɾa]',
    'VERDE': '[ˈveʁ.dʒi]'
  },
  'X': {
    'XÍCARA': '[ˈʃi.ka.ɾa]',
    'XAMPU': '[ʃã.ˈpu]',
    'XERIFE': '[ʃe.ˈɾi.fi]',
    'XADREZ': '[ʃa.ˈdɾes]',
    'XAROPE': '[ʃa.ˈɾɔ.pi]'
  },
  'Z': {
    'ZEBRA': '[ˈze.bɾa]',
    'ZERO': '[ˈzɛ.ɾu]',
    'ZOOLÓGICO': '[zo.o.ˈlɔ.ʒi.ku]',
    'ZANGADO': '[zã.ˈga.du]',
    'ZINCO': '[ˈzĩ.ku]'
  }
}

const frases = [
  {
    texto: 'O GATO BEBE LEITE',
    icone: '🐱'
  },
  {
    texto: 'A CASA É BONITA',
    icone: '🏠'
  },
  {
    texto: 'O SAPO PULA ALTO',
    icone: '🐸'
  },
  {
    texto: 'A BOLA É AZUL',
    icone: '⚽'
  },
  {
    texto: 'O CÉU TEM NUVENS',
    icone: '☁️'
  },
  {
    texto: 'A MENINA LÊ O LIVRO',
    icone: '📚'
  },
  {
    texto: 'O CACHORRO LATE FORTE',
    icone: '🐕'
  },
  {
    texto: 'A BORBOLETA VOA NO JARDIM',
    icone: '🦋'
  },
  {
    texto: 'O PÁSSARO FAZ SEU NINHO',
    icone: '🐦'
  },
  {
    texto: 'A FLOR É VERMELHA',
    icone: '🌹'
  },
  {
    texto: 'O COELHO COME CENOURA',
    icone: '🐰'
  },
  {
    texto: 'A PROFESSORA ENSINA BEM',
    icone: '👩‍🏫'
  },
  {
    texto: 'O SOL BRILHA NO CÉU',
    icone: '☀️'
  },
  {
    texto: 'A CHUVA CAI DEVAGAR',
    icone: '🌧️'
  },
  {
    texto: 'O PEIXE NADA NO MAR',
    icone: '🐠'
  },
  {
    texto: 'A ABELHA FAZ MEL',
    icone: '🐝'
  }
]

const backgrounds = {
  letras: 'linear-gradient(135deg, #6e8efb, #a777e3)',
  silabas: 'linear-gradient(135deg, #FF9A9E, #FAD0C4)',
  palavras: 'linear-gradient(135deg, #A8E6CF, #DCEDC1)',
  frases: 'linear-gradient(135deg, #FFD1FF, #FAD0C4)'
}

export function Game() {
  const { level } = useParams<{ level: string }>()
  const navigate = useNavigate()
  const { playAudio, isPlaying } = useAudio()
  const [currentItem, setCurrentItem] = useState<string | null>(null)

  useEffect(() => {
    if (level) {
      const messages = {
        letras: 'Clique nas letras para ouvir sua pronúncia',
        silabas: 'Vamos aprender as sílabas! Clique para ouvir',
        palavras: 'Clique nas palavras para aprender a ler',
        frases: 'Pratique a leitura de frases completas'
      }
      playAudio(messages[level as keyof typeof messages])
    }
  }, [level, playAudio])

  const handleClick = (item: string) => {
    if (!isPlaying) {
      setCurrentItem(item)
      playAudio(item)
    }
  }

  const renderLetters = () => (
    <>
      <Section>
        <h2>Alfabeto</h2>
        <Grid>
          {Object.entries(alphabet).map(([key, value]) => (
            <PhoneticCard
              key={key}
              letter={key}
              name={value.name}
              phonetic={value.phonetic}
              onClick={() => handleClick(key)}
              isPlaying={isPlaying}
              isActive={currentItem === key}
            />
          ))}
        </Grid>
      </Section>

      <Section>
        <h2>Vogais Orais</h2>
        <Grid>
          {Object.entries(vowels.oral).map(([key, value]) => (
            <PhoneticCard
              key={key}
              letter={key}
              phonetic={value.sound}
              example={value.example}
              onClick={() => handleClick(key)}
              isPlaying={isPlaying}
              isActive={currentItem === key}
            />
          ))}
        </Grid>
      </Section>

      <Section>
        <h2>Vogais Nasais</h2>
        <Grid>
          {Object.entries(vowels.nasal).map(([key, value]) => (
            <PhoneticCard
              key={key}
              letter={key}
              phonetic={value.sound}
              example={value.example}
              onClick={() => handleClick(key)}
              isPlaying={isPlaying}
              isActive={currentItem === key}
            />
          ))}
        </Grid>
      </Section>

      <Section>
        <h2>Consoantes</h2>
        <Grid>
          {Object.entries(consonants).map(([key, value]) => (
            <PhoneticCard
              key={key}
              letter={key}
              phonetic={value.sound}
              example={value.example}
              onClick={() => handleClick(key)}
              isPlaying={isPlaying}
              isActive={currentItem === key}
            />
          ))}
        </Grid>
      </Section>
    </>
  )

  const renderSyllables = () => (
    <>
      {Object.entries(silabasTranscricao).map(([consoante, dados]) => (
        <Section key={consoante}>
          <h2>Sílabas com {consoante}</h2>
          <Grid>
            {dados.silabas.map((silaba, index) => (
              <PhoneticCard
                key={silaba}
                letter={silaba}
                phonetic={dados.fonetica[index]}
                example={`${silaba}la`}
                onClick={() => handleClick(silaba)}
                isPlaying={isPlaying}
                isActive={currentItem === silaba}
              />
            ))}
          </Grid>
        </Section>
      ))}
    </>
  )

  const renderWords = () => (
    <>
      {Object.entries(palavrasComFonetica).map(([letra, palavras]) => (
        <Section key={letra}>
          <h2>Palavras com {letra}</h2>
          <Grid>
            {Object.entries(palavras).map(([palavra, fonetica]) => (
              <PhoneticCard
                key={palavra}
                letter={palavra}
                phonetic={fonetica}
                example={palavra.toLowerCase()}
                onClick={() => handleClick(palavra)}
                isPlaying={isPlaying}
                isActive={currentItem === palavra}
              />
            ))}
          </Grid>
        </Section>
      ))}
    </>
  )

  const renderContent = () => {
    switch (level) {
      case 'letras':
        return renderLetters()
      case 'silabas':
        return renderSyllables()
      case 'palavras':
        return renderWords()
      case 'frases':
        return (
          <Section>
            <h2>Frases para Praticar</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {frases.map(({ texto, icone }) => (
                <PhraseCard
                  key={texto}
                  onClick={() => handleClick(texto)}
                  disabled={isPlaying}
                >
                  <PhraseIcon $isActive={currentItem === texto}>
                    {icone}
                  </PhraseIcon>
                  <PhraseText>
                    {texto}
                  </PhraseText>
                  <SoundIcon $isPlaying={currentItem === texto}>
                    🔊
                  </SoundIcon>
                </PhraseCard>
              ))}
            </div>
          </Section>
        )
      default:
        return null
    }
  }

  return (
    <Container>
      <BackButton to="/levels" message="Voltando para a seleção de níveis" />
      <Title>
        {level === 'letras' && 'Alfabeto e Sons'}
        {level === 'silabas' && 'Vogais e Sons'}
        {level === 'palavras' && 'Consoantes e Sons'}
        {level === 'frases' && 'Frases'}
      </Title>
      {renderContent()}
    </Container>
  )
} 