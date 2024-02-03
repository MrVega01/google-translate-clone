import { Form } from 'react-bootstrap'
import { SelectionType } from '../types.d'

type Props =
  | {
    type: SelectionType.From
    value: string
    onChange: (payload: string) => void
    loading?: undefined
  }
  | {
    type: SelectionType.To
    value: string
    onChange: (payload: string) => void
    loading: boolean
  }

export default function LanguageTextArea ({ type, value, onChange, loading }: Props) {
  const placeholder = type === SelectionType.From
    ? 'Insert text...'
    : !loading ? 'Translate' : 'Loading...'

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
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
  )
}
