import { useState, useEffect } from "react"

type StateType = string | number | boolean

export const useSavedState = <T extends StateType>(
  initialState: T,
  savedName: string
): [T, (newState: T) => void] => {
  const [mounted, setMounted] = useState(false)
  const [state, setState] = useState(initialState)

  useEffect(() => setMounted(true), [])

  const changeState = (newState: T) => {
    localStorage.setItem(savedName, newState.toString())
    setState(newState)
  }

  if (!mounted) return [state, changeState]

  const rawSavedState = localStorage.getItem(savedName)

  let savedState: T =
    ((typeof rawSavedState === "number"
      ? +rawSavedState
      : typeof rawSavedState === "boolean"
      ? !!rawSavedState
      : rawSavedState) as T) ?? initialState

  if (savedState !== state) changeState(savedState)

  return [state, changeState]
}
