import { useRef } from 'react'

export const generateSquares = (rowKeys, colKeys, playerName, squaresRef) => {
  return colKeys.flatMap((colKey, col) => {
    return rowKeys.map((rowKey, row) => {
      const id = `${rowKey}${colKey}${playerName}`
      const key = `${id}-${row * colKeys.length + col}`
      const squareRef = useRef(null)
      squaresRef.current.push(squareRef)

      return (
        <div
          key={key}
          id={id}
          ref={squareRef}
          className='border border-blue-400 bg-blue-100 h-10 w-10 hover:bg-yellow-200 transition-colors cursor-crosshair game_square'
        ></div>
      )
    })
  })
}
