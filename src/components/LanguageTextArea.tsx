import './LanguageTextArea.css'
import { Form } from 'react-bootstrap'
import { type FromLanguage, type Language, SelectionType } from '../types.d'
import { ClipboardIcon, SpeakerIcon } from './Icons'
import { AUTO_LANGUAGE, SPEAKER_LANGUAGES } from '../utils/constants'
import { useRef } from 'react'
import IconButton from './IconButton'
import useDynamicHeight from '../hooks/useDynamicHeight'

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
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  useDynamicHeight({ ref: textAreaRef, value })

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
    utterance.lang = language === AUTO_LANGUAGE ? 'en-GB' : SPEAKER_LANGUAGES[language]

    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }
  return (
    <div className={`position-relative LanguageTextArea ${type === SelectionType.To && 'readOnly'}`}>
      <Form.Control
        as='textarea'
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        readOnly={type === SelectionType.To}
        autoFocus={type === SelectionType.From}
        ref={textAreaRef}
      />
      {
        value !== '' && (
          <div className='position-absolute d-flex'>
            {
              type === SelectionType.To && (
                <IconButton
                  icon={<ClipboardIcon />}
                  onClick={handleClipboard}
                />
              )
            }
            <IconButton
              icon={<SpeakerIcon />}
              onClick={handleSpeak}
            />
          </div>
        )
      }
    </div>
  )
}
