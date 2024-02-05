import { useCallback, useEffect } from 'react'

interface Props {
  ref: React.MutableRefObject<HTMLTextAreaElement | null>
  value: string
}

export default function useDynamicHeight ({ ref, value }: Props) {
  const dynamicHeight = useCallback(() => {
    if (ref.current !== null) {
      // Dynamic height on resize
      ref.current.style.height = ''
      ref.current.style.height = `${ref.current.scrollHeight}px`
    }
  }, [ref])

  useEffect(() => {
    // Event
    window.addEventListener('resize', dynamicHeight)
    return () => { window.removeEventListener('resize', dynamicHeight) }
  }, [])
  useEffect(() => {
    // On change value
    dynamicHeight()
  }, [value])
}
