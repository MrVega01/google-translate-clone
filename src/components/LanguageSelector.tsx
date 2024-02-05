import './LanguageSelector.css'
import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../utils/constants'
import { SelectionType, type FromLanguage, type Language } from '../types.d'

// interface Props {
//   onChange: (payload: Language) => void
// }
type Props =
  | { type: SelectionType.From, value: FromLanguage, onChange: (payload: FromLanguage) => void }
  | { type: SelectionType.To, value: Language, onChange: (payload: Language) => void }

export default function LanguageSelector ({ onChange, type, value }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language)
  }
  return (
    <Form.Select
      onChange={handleChange}
      aria-label="Select language"
      value={value}
      className='LanguageSelector'
    >
      {
        type === SelectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      }
      {
        Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => {
          return (
            <option key={key} value={key}>{value}</option>
          )
        })
      }
    </Form.Select>
  )
}
