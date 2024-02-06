import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import { useTranslateReducer } from './hooks/useTranslateReducer'
import { AUTO_LANGUAGE } from './utils/constants'
import { ArrowsIcon, GoogleLogoIcon } from './components/Icons'
import LanguageSelector from './components/LanguageSelector'
import { SelectionType } from './types.d'
import LanguageTextArea from './components/LanguageTextArea'
import { useEffect } from 'react'
import translate from './services/translate'
import useDebounce from './hooks/useDebounce'
import IconButton from './components/IconButton'

function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    loading
  } = useTranslateReducer()

  const debounceFromText = useDebounce(fromText, 500)

  useEffect(() => {
    if (debounceFromText !== '') {
      translate({ fromLanguage, toLanguage, text: fromText })
        .then((response) => {
          if (response == null) return
          setResult(response)
        })
        .catch(() => {
          setResult('You can only do 5 translations per minute!')
        })
    }
  }, [fromText, debounceFromText, fromLanguage, toLanguage])

  return (
    <Container className='App'>
      <h1 className='text-center'>
        <GoogleLogoIcon/> Translate
      </h1>
      <Row>
        <Col className='translateBox'>
          <LanguageSelector
            type={SelectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          <LanguageTextArea
            type={SelectionType.From}
            value={fromText}
            onChange={setFromText}
            language={fromLanguage}
          />
        </Col>
        <Col xs='auto' className='p-0' >
          <IconButton
            icon={<ArrowsIcon />}
            onClick={interchangeLanguages}
            disabled={fromLanguage === AUTO_LANGUAGE}
          />
        </Col>
        <Col className='translateBox'>
          <LanguageSelector
            type={SelectionType.To}
            value={toLanguage}
            onChange={setToLanguage}
          />
          <LanguageTextArea
            type={SelectionType.To}
            value={result}
            onChange={setResult}
            language={toLanguage}
            loading={loading}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
