import { useReducer } from 'react'
import type { ReducerState, ReducerAction, Language, FromLanguage } from '../types'
import { AUTO_LANGUAGE } from '../utils/constants'

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
