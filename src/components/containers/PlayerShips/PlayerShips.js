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
  const [placementResult, setPlacementResult] = useState(null)
  const [defaultPositions, setDefaultPositions] = useState({
    carrier: { x: 0, y: 0 },
    battleship: { x: 0, y: 45 },
    cruiser: { x: 0, y: 90 },
    destroyer: { x: 0, y: 135 }
  })

  const ships = [
    {
      name: 'carrier',
      length: 4,
      placed: false
    },
    {
      name: 'battleship',
      length: 3,
      placed: false
    },
    {
      name: 'cruiser',
      length: 2,
      placed: false
    },
    {
      name: 'destroyer',
      length: 1,
      placed: false
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

  function onStartDrag(ship) {
    ship.placed = false
    const shipCont = document.getElementById(ship.name + '0').parentElement
    shipCont.style.left = ''
    shipCont.style.top = ''
  }

  function handleCoordOnDrag(event, ship) {
    ship.placed = false
    const shipContainer = event.target.parentNode
    const spans = shipContainer.querySelectorAll('span')
    const spansArr = []

    spans.forEach(span => {
      const coord = span.getBoundingClientRect()
      const x = coord.x
      const y = coord.y
      spansArr.push({ spanId: span.id, x, y })
    })
    const result = { ship: ship, shipSpansCoord: spansArr }
    setPlacementResult(result)
    placementHelper(result)
  }

  function handleStopDrag(ship) {
    ship.placed = true
    if (placementResult && placementResult.shipSpansCoord) {
      placementResult.shipSpansCoord.forEach(span => {
        const shipCont = document.getElementById(span.spanId).parentElement

        if (placementResult.placementResult) {
          // const computedStyle = getComputedStyle(shipCont)
          // const transformValue = computedStyle.transform
          // const translateValues = transformValue.match(/translate\((.+?)\)/)

          shipCont.style.transform = 'translate(0, 0)'
          shipCont.style.left = placementResult.placementResult[0].x + 'px'
          shipCont.style.top = placementResult.placementResult[0].y + 'px'

          setDefaultPositions(prevDefaultPositions => ({
            ...prevDefaultPositions,
            [ship.name]: { x: 0, y: 0 }
          }))
        }
      })
    }
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

    const defaultPosition = defaultPositions[ship.name]

    return (
      <Draggable
        key={ship.name}
        onStart={() => {
          setIsDragging(true)
          onStartDrag(ship)
        }}
        onDrag={e => {
          setIsDragging(true)
          handleCoordOnDrag(e, ship)
        }}
        onStop={() => {
          setIsDragging(false)
          handleStopDrag(ship)
        }}
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
