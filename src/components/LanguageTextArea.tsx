import { Button, Form } from 'react-bootstrap'
import { type FromLanguage, type Language, SelectionType } from '../types.d'
import { ClipboardIcon, SpeakerIcon } from './Icons'
import { SPEAKER_LANGUAGES } from '../utils/constants'

type Props =
  | {
    type: SelectionType.From
    value: string
    onChange: (payload: string) => void
    language: FromLanguage
    loading?: undefined
  }
  | {
    type: SelectionType.To
    value: string
    onChange: (payload: string) => void
    language: Language
    loading: boolean
  }

export default function LanguageTextArea ({
  type,
  value,
  onChange,
  language,
  loading
}: Props) {
  const placeholder = type === SelectionType.From
    ? 'Insert text...'
    : !loading ? 'Translate' : 'Loading...'

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }
  const handleClipboard = () => {
    navigator.clipboard.writeText(value).catch(() => {})
  }
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(value)
    utterance.lang = language === 'auto' ? 'en-GB' : SPEAKER_LANGUAGES[language]

    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  return (
    <div className='position-relative'>
      <Form.Control
        as='textarea'
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        readOnly={type === SelectionType.To}
        autoFocus={type === SelectionType.From}
        style={{ height: 150, resize: 'none' }}
        className={type === SelectionType.To ? 'bg-light' : ''}
      />
      {
        value !== '' && (
          <div
            className='position-absolute d-flex'
            style={{ left: 0, bottom: 0 }}
          >
            {
              type === SelectionType.To && (
                <Button
                  variant='link'
                  onClick={handleClipboard}
                >
                  <ClipboardIcon />
                </Button>
              )
            }
            <Button
              variant='link'
              onClick={handleSpeak}
            >
              <SpeakerIcon />
            </Button>
          </div>
        )
      }
    </div>
  )
}
