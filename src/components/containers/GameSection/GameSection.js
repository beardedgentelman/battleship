import { useContext, useEffect, useRef } from 'react'
// eslint-disable-next-line simple-import-sort/imports
import { PlayerContext } from 'App'
import { generateSquares } from 'helpers/generateSquares'

export const playerSquaresCoord = []
export const computerSquaresCoord = []

const GameSection = ({ id }) => {
  const { playerName } = useContext(PlayerContext)
  const sectionRef = useRef(null)

  const rowKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const colKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  const squaresRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const squareRefs = squaresRef.current

    if (section) {
      squareRefs.forEach(squareRef => {
        const { x, y } = squareRef.current.getBoundingClientRect()
        const result = { id: squareRef.current.id, x: x, y: y }

        if (playerName !== 'Computer') {
          playerSquaresCoord.push(result)
        }
        if (playerName === 'Computer') {
          computerSquaresCoord.push(result)
        }
      })
    }
  }, [sectionRef, playerName])

  const squares = generateSquares(rowKeys, colKeys, playerName, squaresRef)

  return (
    <section className='w-fit h-fit'>
      <h2 className='text-center text-2xl font-bold'>{playerName}</h2>
      <div className='grid w-full' style={{ gridTemplateColumns: 'auto 1fr' }}>
        <div className='w-fit h-fit'></div>
        <div className='flex flex-row w-fit h-fit'>
          {rowKeys.map((rowKey, index) => (
            <div
              key={rowKey}
              style={{ gridArea: `1 / ${index + 2} / 2 / ${index + 2}` }}
              className='flex items-center justify-center w-10 h-10'
            >
              <span>{rowKey}</span>
            </div>
          ))}
        </div>
        <div className='flex flex-col w-fit h-fit'>
          {colKeys.map((colKey, index) => (
            <div
              key={colKey}
              style={{ gridArea: `${index + 2} / 1 / ${index + 2} / 2` }}
              className='flex items-center justify-center w-10 h-10'
            >
              <span>{colKey}</span>
            </div>
          ))}
        </div>
        <div ref={sectionRef} id={id} className='grid grid-cols-10 w-[400px] h-fit'>
          {squares}
        </div>
      </div>
    </section>
  )
}

export default GameSection
