import { useReducer } from 'react'
import type { ReducerState, ReducerAction, Language, FromLanguage } from '../types'
import { AUTO_LANGUAGE, DEFAULT_LANGUAGES } from '../utils/constants'

const initialState: ReducerState = {
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
      if (state.fromLanguage === AUTO_LANGUAGE) return state
      const loading = state.fromText !== ''
      const fromText = state.loading ? state.fromText : state.result

      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        fromText,
        result: '',
        loading
      }
    }
    case 'SET_FROM_LANGUAGE': {
      const toLanguage = action.payload === state.toLanguage
        ? action.payload === DEFAULT_LANGUAGES[0]
          ? DEFAULT_LANGUAGES[1] as Language
          : DEFAULT_LANGUAGES[0] as Language
        : state.toLanguage
      const loading = state.fromText !== ''

      return {
        ...state,
        toLanguage,
        fromLanguage: action.payload,
        result: '',
        loading
      }
    }
    case 'SET_TO_LANGUAGE': {
      const fromLanguage = action.payload === state.fromLanguage
        ? action.payload === DEFAULT_LANGUAGES[0]
          ? DEFAULT_LANGUAGES[1] as Language
          : DEFAULT_LANGUAGES[0] as Language
        : state.fromLanguage
      const loading = state.fromText !== ''

      return {
        ...state,
        toLanguage: action.payload,
        fromLanguage,
        result: '',
        loading
      }
    }
    // TEXTS
    case 'SET_FROM_TEXT': {
      const loading = action.payload !== ''
      return {
        ...state,
        fromText: action.payload,
        loading,
        result: ''
      }
    }
    case 'SET_RESULT': {
      return {
        ...state,
        result: action.payload,
        loading: false
      }
    }
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload
      }
    }
    default: return state
  }
}
export function useTranslateReducer () {
  const [state, dispatch] = useReducer(reducer, initialState)

  const interchangeLanguages = () => { dispatch({ type: 'INTERCHANGE_LANGUAGES' }) }
  const setFromLanguage = (payload: FromLanguage) => { dispatch({ type: 'SET_FROM_LANGUAGE', payload }) }
  const setToLanguage = (payload: Language) => { dispatch({ type: 'SET_TO_LANGUAGE', payload }) }
  const setFromText = (payload: string) => { dispatch({ type: 'SET_FROM_TEXT', payload }) }
  const setResult = (payload: string) => { dispatch({ type: 'SET_RESULT', payload }) }
  const setLoading = (payload: boolean) => { dispatch({ type: 'SET_LOADING', payload }) }

  return {
    ...state,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    setLoading
  }
}
