import { ChangeEventHandler, useState } from "react"
import { ChevronRightIcon, EraserIcon, PencilIcon } from "./icon"

export interface ToolbarProps {
  penColorChanger: ChangeEventHandler<HTMLInputElement>
  penThicknessChanger: ChangeEventHandler<HTMLInputElement>

  changeEraserSelected: ChangeEventHandler<HTMLInputElement>
  eraserSelected: boolean
}

export default function Toolbar(props: ToolbarProps) {
  const [toggled, setToggled] = useState<boolean>(false)
  const [penToggled, setPenToggled] = useState<boolean>(false)
  const [eraserToggled, setEraserToggled] = useState<boolean>(false)

  // use flexbox for this
  return (
    <div>
      <button
        onClick={() => setToggled(!toggled)}
        className={`absolute top-[45vh] -left-2 z-1
          ${toggled && "translate-x-25"} rounded-lg border-2 border-gray-400
          bg-white p-2 duration-250`}
      >
        <ChevronRightIcon toggled={toggled} />
      </button>
      {toggled ? (
        <div
          className="absolute top-[26vh] -left-25 z-10 grid h-[40vh] w-25
            translate-x-25 grid-cols-2 grid-rows-10 gap-0.5 rounded-lg border-2
            border-l-0 border-gray-400 bg-white duration-250"
        >
          <div
            className={`col-auto row-auto m-auto rounded-md border-2
              border-gray-200 p-1 shadow-2xs
              ${penToggled ? "border-gray-300 bg-gray-200" : "hover:bg-gray-200"}`}
            onMouseDown={() => setPenToggled(!penToggled)}
          >
            <PencilIcon toggled={penToggled} />
          </div>

          <div
            className={`col-auto row-auto m-auto rounded-md border-2
              border-gray-200 p-1 shadow-2xs
              ${eraserToggled ? "border-gray-300 bg-gray-200" : "hover:bg-gray-200"}`}
            onMouseDown={() => setEraserToggled(!eraserToggled)}
          >
            <EraserIcon toggled={eraserToggled} />
          </div>
        </div>
      ) : (
        <div
          className="absolute top-[26vh] -left-25 z-10 h-[40vh] w-25 rounded-lg
            border-3 border-l-0 border-gray-300 bg-white duration-250"
        ></div>
      )}
    </div>
  )
}
