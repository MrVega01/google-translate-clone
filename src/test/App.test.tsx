import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('Translate "Hola mundo" to "Hello world"', async () => {
  const user = userEvent.setup()

  const app = render(<App />)
  const textAreaFrom = app.getByPlaceholderText('Insert text...')

  await user.type(textAreaFrom, 'Hola mundo')
  const result = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 5000 })

  expect(result).toBeTruthy()
})
