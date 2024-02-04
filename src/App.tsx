import { Button, Col, Container, Row } from 'react-bootstrap'
import './App.css'
import { useTranslateReducer } from './hooks/useTranslateReducer'
import { AUTO_LANGUAGE } from './utils/constants'
import { ArrowsIcon } from './components/Icons'
import LanguageSelector from './components/LanguageSelector'
import { SelectionType } from './types.d'
import LanguageTextArea from './components/LanguageTextArea'
import { useEffect } from 'react'
import translate from './services/translate'
import useDebounce from './hooks/useDebounce'

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

  const debounceFromText = useDebounce(fromText, 400)

  useEffect(() => {
    if (debounceFromText !== '') {
      translate({ fromLanguage, toLanguage, text: fromText })
        .then((response) => {
          if (response == null) return
          setResult(response)
        })
        .catch(() => {
          setResult('Error')
        })
    }
  }, [fromText, debounceFromText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <h1 className='text-center'>Google Translate</h1>
      <Row>
        <Col>
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
        <Col xs='auto'>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}>
              <ArrowsIcon />
          </Button>
        </Col>
        <Col>
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
