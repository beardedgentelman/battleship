export const generateSquares = (rowKeys, colKeys) => {
  const numSquares = rowKeys.length * colKeys.length

  return Array(numSquares)
    .fill()
    .map((_, i) => {
      const row = i % rowKeys.length
      const col = Math.floor(i / rowKeys.length)
      const id = `${rowKeys[row]}${colKeys[col]}`
      const key = `${id}-${i}`

      return (
        <div
          key={key}
          id={id}
          className='border border-blue-400 bg-blue-100 h-10 w-10 hover:bg-yellow-200 transition-colors cursor-crosshair game_square'
        ></div>
      )
    })
}
