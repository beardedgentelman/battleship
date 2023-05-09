import { useContext } from 'react'
// eslint-disable-next-line simple-import-sort/imports
import { PlayerContext } from 'App'
import { generateSquares } from 'helpers/generateSquares'

const GameSection = ({ id }) => {
  const { playerName } = useContext(PlayerContext)

  const rowKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const colKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  const squares = generateSquares(rowKeys, colKeys, playerName)

  return (
    <section className='w-fit h-[90vh]' id={id}>
      <h2 className='text-center text-2xl font-bold'>{playerName}</h2>
      <div className='grid grid-cols-11 place-items-center w-fit h-fit'>
        <div></div>
        {colKeys.map((colKey, index) => (
          <div
            key={colKey}
            style={{ gridArea: `${index + 2} / 1 / ${index + 2} / 2` }}
            className='flex items-center justify-center w-10 h-10'
          >
            <span>{colKey}</span>
          </div>
        ))}
        {rowKeys.map((rowKey, index) => (
          <div
            key={rowKey}
            style={{ gridArea: `1 / ${index + 2} / 2 / ${index + 2}` }}
            className='flex items-center justify-center w-10 h-10'
          >
            <span>{rowKey}</span>
          </div>
        ))}
        {squares}
      </div>
    </section>
  )
}

export default GameSection
