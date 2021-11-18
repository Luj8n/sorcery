import { useState, useEffect } from "react"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"

interface SelectProps {
  info: string
  items: string[]
  defaultItem: string
  onSelect: (option: string) => void
}

const Select = ({ info, items, defaultItem, onSelect }: SelectProps) => {
  // TODO: show tooltip, better scrolling, colors
  const [selected, setSelected] = useState(defaultItem)
  const [open, setOpen] = useState(false)
  return (
    <div className="relative select-none">
      <div
        onClick={() => setOpen(!open)}
        className="w-min bg-primary-400 dark:bg-primary-600 rounded-md py-1 px-3 flex flex-row justify-center items-center font-semibold text-lg cursor-pointer"
      >
        {open ? <MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} />}
        <h3 className="ml-1">{selected}</h3>
      </div>
      {open && (
        <div className="max-h-80 overflow-y-scroll scrollbar-hidden absolute bg-primary-300 dark:bg-primary-600 rounded-lg p-1.5 top-12 space-y-1">
          {items.map((item) => (
            <p
              key={item}
              onClick={() => {
                setSelected(item)
                setOpen(false)
                onSelect(item)
              }}
              className={
                "cursor-pointer py-1 px-3 rounded-md" +
                " " +
                (selected === item ? "bg-primary-500 dark:bg-primary-500" : "hover:bg-primary-400")
              }
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
