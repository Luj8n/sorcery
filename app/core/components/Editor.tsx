import { useState } from "react"

export interface EditorProps {
  value: string
  onChange: (newValue: string) => void
  className?: string
}

const Editor = ({ value, onChange, className }: EditorProps) => {
  const [history, setHistory] = useState([value])
  const [pointer, setPointer] = useState(0)

  const updateHistory = (newValue: string) => {
    setHistory([...history.slice(0, pointer + 1), newValue])
    setPointer(pointer + 1)
  }

  return (
    <textarea
      className={
        "font-firaMono whitespace-pre text-base bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100 p-5 resize-none outline-none" +
        " " +
        className
      }
      spellCheck={false}
      onKeyDown={(e) => {
        const start = e.currentTarget.selectionStart
        const end = e.currentTarget.selectionEnd
        const value = e.currentTarget.value

        if (e.ctrlKey) {
          if (e.key === "z") {
            e.preventDefault()
            if (pointer > 0) {
              onChange(history[pointer - 1]!)
              setPointer(pointer - 1)
            }
          } else if (e.key === "y") {
            e.preventDefault()
            if (pointer + 1 < history.length) {
              onChange(history[pointer + 1]!)
              setPointer(pointer + 1)
            }
          }
          return
        }

        if (e.key === "Tab") {
          e.preventDefault()
          const newValue = value.substring(0, start) + "  " + value.substring(end)

          e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2

          updateHistory(newValue)
          onChange(newValue)
        } else if (e.key === "Enter") {
          e.preventDefault()
          const newValue = value.substring(0, start) + "\n" + value.substring(end)

          e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1

          updateHistory(newValue)
          onChange(newValue)
        }
      }}
      value={value}
      onChange={(e) => {
        updateHistory(e.target.value)
        onChange(e.target.value)
      }}
    />
  )
}

export default Editor
