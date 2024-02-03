import { Button, Col, Container, Row } from 'react-bootstrap'
import './App.css'
import { useTranslateReducer } from './hooks/useTranslateReducer'
import { AUTO_LANGUAGE } from './utils/constants'
import { ArrowsIcon } from './components/Icons'
import LanguageSelector from './components/LanguageSelector'
import { SelectionType } from './types.d'
import LanguageTextArea from './components/LanguageTextArea'

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
    setResult
  } = useTranslateReducer()
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
            loading={false}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
