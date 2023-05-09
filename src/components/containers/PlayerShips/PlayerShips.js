import { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

const PlayerShips = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [isCarrierVertical, setIsCarrierVertical] = useState(false)
  const [isBattleshipVertical, setIsBattleshipVertical] = useState(false)
  const [isCruiserVertical, setIsCruiserVertical] = useState(false)
  const [isDestroyerVertical, setIsDestroyerVertical] = useState(false)
  const shipRef = useRef(null)

  const ships = [
    {
      name: 'carrier',
      length: 4,
      placed: null
    },
    {
      name: 'battleship',
      length: 3,
      placed: null
    },
    {
      name: 'cruiser',
      length: 2,
      placed: null
    },
    {
      name: 'destroyer',
      length: 1,
      placed: null
    }
  ]

  const handleRightClick = (event, ship) => {
    event.preventDefault()
    switch (ship.name) {
      case 'carrier':
        setIsCarrierVertical(!isCarrierVertical)
        break
      case 'battleship':
        setIsBattleshipVertical(!isBattleshipVertical)
        break
      case 'cruiser':
        setIsCruiserVertical(!isCruiserVertical)
        break
      case 'destroyer':
        setIsDestroyerVertical(!isDestroyerVertical)
        break
      default:
        break
    }
  }

  const handleContextMenu = ship => event => {
    handleRightClick(event, ship)
  }

  useEffect(() => {
    const ship = shipRef.current
    // console.log(ship)
    if (ship) {
      const { x, y } = ship.getBoundingClientRect()
      console.log(`Position of section named ${ship}: (${x}, ${y})`)
    }
  })

  return ships.map(ship => {
    const isVertical = (() => {
      if (ship.name === 'carrier') {
        return isCarrierVertical
      } else if (ship.name === 'battleship') {
        return isBattleshipVertical
      } else if (ship.name === 'cruiser') {
        return isCruiserVertical
      } else if (ship.name === 'destroyer') {
        return isDestroyerVertical
      }
    })()

    const shipSpans = Array(ship.length)
      .fill()
      .map((_, i) => (
        <span key={i} id={ship.name + i} className='bg-blue-700 h-10 w-10 ship border border-blue-300'></span>
      ))

    return (
      <Draggable
        key={ship.name}
        onStart={() => setIsDragging(true)}
        onDrag={() => setIsDragging(true)}
        onStop={() => setIsDragging(false)}
      >
        <div
          className={`ship-container flex items-end h-fit w-fit ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${
            isVertical ? 'flex-col' : 'flex-row'
          }`}
          onContextMenu={handleContextMenu(ship)}
        >
          {shipSpans}
        </div>
      </Draggable>
    )
  })
}

export default PlayerShips
