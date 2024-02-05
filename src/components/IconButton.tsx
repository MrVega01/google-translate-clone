import './IconButton.css'
import { Button } from 'react-bootstrap'

interface Props {
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  icon: JSX.Element
  disabled: boolean
}

export default function IconButton ({
  onClick,
  icon,
  disabled
}: Props) {
  return (
    <Button
      variant='link'
      className='IconButton'
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </Button>
  )
}
