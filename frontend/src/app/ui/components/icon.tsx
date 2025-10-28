import { FaChevronRight } from "react-icons/fa6"
import { PiPencilSimple, PiEraser } from "react-icons/pi"

export interface IconProps {
  toggled: boolean
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <FaChevronRight
      size="1.5em"
      className={`${props.toggled && "rotate-180"} text-gray-500 duration-250`}
    />
  )
}

export function PencilIcon(props: IconProps) {
  return <PiPencilSimple size="2em" className="text-black" />
}

export function EraserIcon(props: IconProps) {
  return <PiEraser size="2em" className="text-black" />
}
