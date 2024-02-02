import { useReducer } from 'react'
import './App.css'
import type { ReducerState, ReducerAction } from './types'

const initialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function reducer (state: ReducerState, action: ReducerAction) {
  const { type } = action

  switch (type) {
    // LANGUAGES
    case 'INTERCHANGE_LANGUAGES': {
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    }
    case 'SET_FROM_LANGUAGE': {
      return {
        ...state,
        fromLanguage: action.payload
      }
    }
    case 'SET_TO_LANGUAGE': {
      return {
        ...state,
        toLanguage: action.payload
      }
    }
    // TEXTS
    case 'SET_FROM_TEXT': {
      return {
        ...state,
        fromText: action.payload
      }
    }
    case 'SET_RESULT': {
      return {
        ...state,
        result: action.payload
      }
    }
    default: return state
  }
}

function App () {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <p>Translate</p>
    </>
  )
}

export default App
