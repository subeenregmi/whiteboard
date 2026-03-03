import { ChangeEventHandler, useState } from "react"
import { ChevronRightIcon, EraserIcon, PencilIcon } from "./icon"
import { PRESET_COLORS } from "@/models/constants"

export interface ToolbarProps {
  penThicknessChanger: ChangeEventHandler<HTMLInputElement>

  onColorSelect: (color: string) => void
  selectedColor: string

  onEraserSelect: () => void
  onPenSelect: () => void
  eraserSelected: boolean
}

export default function Toolbar(props: ToolbarProps) {
  const [toggled, setToggled] = useState<boolean>(false)

  return (
    <div
      className={`absolute top-[26vh] left-0 z-10 flex items-center duration-250
        ${toggled ? "translate-x-0" : "-translate-x-[calc(100%-2.5rem)]"}`}
    >
      {/* Sliding panel */}
      <div
        className="rounded-xl border-2 border-gray-300 bg-white
          shadow-xl w-26 p-2 pr-1"
      >
        <div className="grid grid-cols-2 grid-rows-6 gap-[2px]">
          <button
            type="button"
            className={`col-auto row-auto flex size-10 items-center
              justify-center rounded-md border-2 border-gray-200 p-1
              ${!props.eraserSelected ? "border-gray-300 bg-gray-200 shadow-sm" : "hover:bg-gray-200"}`}
            onClick={props.onPenSelect}
          >
            <PencilIcon toggled={!props.eraserSelected} />
          </button>

          <button
            type="button"
            className={`col-auto row-auto flex size-10 items-center
              justify-center rounded-md border-2 border-gray-200 p-1
              ${props.eraserSelected ? "border-gray-300 bg-gray-200 shadow-sm" : "hover:bg-gray-200"}`}
            onClick={props.onEraserSelect}
          >
            <EraserIcon toggled={props.eraserSelected} />
          </button>

          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={`col-auto row-auto flex size-10 items-center
                justify-center rounded-md border-2 p-1 focus:outline-none focus:ring-0
                ${props.selectedColor === color ? "border-gray-300 bg-gray-200 shadow-sm" : "border-gray-200 hover:bg-gray-200"}`}
              onClick={() => {
                props.onColorSelect(color)
                props.onPenSelect()
              }}
            >
              <div
                className="size-6 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Arrow toggle button - connected to panel */}
      <button
        type="button"
        onClick={() => setToggled(!toggled)}
        className="rounded-xl border-2 border-l-0 border-gray-300 bg-white p-2 -ml-1"
      >
        <ChevronRightIcon toggled={toggled} />
      </button>
    </div>
  )
}
