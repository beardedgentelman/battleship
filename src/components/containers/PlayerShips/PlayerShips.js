import { useState } from 'react'
import Draggable from 'react-draggable'
// eslint-disable-next-line simple-import-sort/imports
import { placementHelper } from 'helpers/placementHelper'

const PlayerShips = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [isCarrierVertical, setIsCarrierVertical] = useState(false)
  const [isBattleshipVertical, setIsBattleshipVertical] = useState(false)
  const [isCruiserVertical, setIsCruiserVertical] = useState(false)
  const [isDestroyerVertical, setIsDestroyerVertical] = useState(false)
  // const [carrierDefCoords, setCarrierDefCoords] = useState(null)
  // const [battleshipDefCoords, setBattleshipDefCoords] = useState(null)
  // const [cruiserDefCoords, setCruiserDefCoords] = useState(null)
  // const [destroyerDefCoords, setDestroyerDefCoords] = useState(null)
  const [placementResult, setPlacementResult] = useState(null)

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
    handleCoordOnDrag(event, ship)
  }

  let yPosition = 0

  function handleCoordOnDrag(event, ship) {
    const shipContainer = event.target.parentNode
    const spans = shipContainer.querySelectorAll('span')
    const spansArr = []
    spans.forEach(span => {
      const coord = span.getBoundingClientRect()
      const x = coord.x
      const y = coord.y
      spansArr.push({ spanId: span.id, x, y })
    })
    const result = { name: ship.name, shipSpansCoord: spansArr }
    setPlacementResult(result)
    placementHelper(placementResult)
  }

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

    const defaultPosition = { x: 0, y: yPosition }

    yPosition += 45

    return (
      <Draggable
        key={ship.name}
        onStart={() => setIsDragging(true)}
        onDrag={e => {
          setIsDragging(true)
          handleCoordOnDrag(e, ship)
        }}
        onStop={() => setIsDragging(false)}
        defaultPosition={defaultPosition}
        cancel='placed'
      >
        <div
          className={`ship-container absolute flex items-end h-fit w-fit ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          } ${isVertical ? 'flex-col' : 'flex-row'}`}
          onContextMenu={handleContextMenu(ship)}
        >
          {shipSpans}
        </div>
      </Draggable>
    )
  })
}

export default PlayerShips
