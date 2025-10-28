'use client'

import { useEffect, useRef, useState } from 'react'
import WhiteboardWS from '@/utils/ws'
import { Stroke } from '@/models/stroke'
import { Erase } from '@/models/erase'
import {
  DEFAULT_COLOR,
  DEFAULT_STYLE,
  DEFAULT_THICKNESS,
  Position,
  SCALE_FACTOR,
} from '@/models/constants'
import { Pen } from '@/models/pen'
import Toolbar from './toolbar'

const ws = new WhiteboardWS()

export default function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D>(null)

  const [strokes, setStrokes] = useState<Stroke[]>([])

  const [pen, setPen] = useState<Pen>({
    color: DEFAULT_COLOR,
    thickness: DEFAULT_THICKNESS,
    style: DEFAULT_STYLE,
  })

  const [eraserSelected, setEraserSelected] = useState<boolean>(false)

  const currentPosition = useRef<Position>([0, 0])

  const mouseDown = useRef<boolean>(false)

  const currentStroke: Stroke = {
    id: Date.now(),
    uname: 'test',
    coordinates: [],
    pen: pen,
  }

  // Initial rendering of whiteboard
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    canvas!.height = window.innerHeight * SCALE_FACTOR
    canvas!.width = window.innerWidth * SCALE_FACTOR
    canvas!.style.height = `${window.innerHeight}px`
    canvas!.style.width = `${window.innerWidth}px`

    context!.strokeStyle = DEFAULT_COLOR
    context!.lineWidth = DEFAULT_THICKNESS
    context!.lineCap = DEFAULT_STYLE

    contextRef.current = context!

    ws.handleIncomingData(
      (s: Stroke) => {
        setStrokes((prev) => [...prev, s])
      },
      (e: Erase) => {
        setStrokes((prev) =>
          prev.filter((s: Stroke) => {
            return !e.ids.includes(s.id)
          })
        )
      }
    )
  }, [])

  // Re-draw entire whiteboard when strokes changes
  useEffect(() => {
    const context = contextRef.current
    const canvas = canvasRef.current

    context!.clearRect(0, 0, canvas!.width, canvas!.height)

    for (const stroke of strokes) {
      context!.strokeStyle = stroke.highlighted
        ? 'rgba(0, 0, 0, 0.2)'
        : stroke.pen.color
      context!.lineWidth = stroke.pen.thickness

      context?.beginPath()

      const c = stroke.coordinates?.[0]

      if (stroke.coordinates.length == 0) {
        // Do nothing
      } else if (stroke.coordinates.length == 1) {
        context?.moveTo(c[0], c[1])
        context?.fillRect(c[0], c[1], 1, 1)
      } else {
        const c = stroke.coordinates[0]
        context?.moveTo(c[0], c[1])
        stroke.coordinates.forEach((x) => {
          context?.lineTo(x[0], x[1])
        })
      }
      context?.stroke()
    }
  }, [strokes])

  function updatePos(event: React.MouseEvent) {
    const x = event.clientX * SCALE_FACTOR

    // hack to handle the displacement the top toolbar causes
    const y = event.clientY * SCALE_FACTOR - 48
    currentPosition.current = [x, y]
  }

  function stopPainting() {
    const finishedStroke: Stroke = {
      ...currentStroke,
      pen: { ...currentStroke.pen },
      timestamp: Date.now(),
    }
    ws.sendStroke(finishedStroke)
    setStrokes([...strokes, finishedStroke])

    currentStroke.coordinates = []
  }

  function stopErasing() {
    const erased: Erase = {
      ids: strokes
        .filter((s: Stroke) => s.highlighted)
        .map((s: Stroke) => s.id),
    }

    ws.sendErase(erased)

    setStrokes(strokes.filter((s: Stroke) => !s.highlighted))
  }

  function handleDraw(event: React.MouseEvent) {
    const x = event.clientX * SCALE_FACTOR

    // hack to handle the displacement the top toolbar causes
    const y = event.clientY * SCALE_FACTOR - 48

    contextRef.current!.strokeStyle = pen.color
    contextRef.current!.lineWidth = pen.thickness

    currentStroke.coordinates.push([x, y])

    contextRef.current?.beginPath()
    contextRef.current?.moveTo(
      currentPosition.current[0],
      currentPosition.current[1]
    )
    contextRef.current?.lineTo(x, y)
    contextRef.current?.stroke()
    updatePos(event)
  }

  function handleErasing(event: React.MouseEvent) {
    const x = event.clientX * SCALE_FACTOR

    // hack to handle the displacement the top toolbar causes
    const y = event.clientY * SCALE_FACTOR - 48

    const newStrokes: Stroke[] = []

    let changed = false

    for (let i = 0; i < strokes.length; i++) {
      for (const coord of strokes[i].coordinates) {
        const dist = Math.sqrt(
          Math.pow(coord[0] - x, 2) + Math.pow(coord[1] - y, 2)
        )

        if (
          dist < 10 + strokes[i].pen.thickness / 2 &&
          !strokes[i].highlighted
        ) {
          changed = true
          strokes[i].highlighted = true
        }
      }
      newStrokes.push(strokes[i])
    }

    if (changed) setStrokes(newStrokes)
  }

  function handleMouseDown(event: React.MouseEvent) {
    updatePos(event)
    mouseDown.current = true
  }

  function handleMouseUp() {
    mouseDown.current = false
    if (eraserSelected) {
      stopErasing()
    } else {
      stopPainting()
    }
  }

  function handleMouseMovement(event: React.MouseEvent) {
    console.log(strokes.length)
    if (!mouseDown.current) return

    if (eraserSelected) {
      handleErasing(event)
    } else {
      handleDraw(event)
    }
  }

  function changePenColor(event: React.ChangeEvent<HTMLInputElement>) {
    pen.color = event.target.value
    setPen(pen)
  }

  function changePenThickness(event: React.ChangeEvent<HTMLInputElement>) {
    pen.thickness = Number(event.target.value)
    setPen(pen)
  }

  function changeEraserSelected(event: React.ChangeEvent<HTMLInputElement>) {
    setEraserSelected(event.target.checked)
  }

  return (
    <div className="relative">
      <Toolbar
        penColorChanger={changePenColor}
        penThicknessChanger={changePenThickness}
        eraserSelected={eraserSelected}
        changeEraserSelected={changeEraserSelected}
      />
      <canvas
        ref={canvasRef}
        className="bg-white"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMovement}
        style={{
          cursor: eraserSelected ? `url("/eraser.svg"), default` : 'default',
        }}
      ></canvas>
    </div>
  )
}
