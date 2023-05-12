import { useState } from 'react'
import Draggable from 'react-draggable'

import { playerSquaresCoord } from '../GameSection/GameSection'
// eslint-disable-next-line simple-import-sort/imports

export const playerPositions = []

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
  const [currentPositions, setCurrentPositions] = useState({
    carrier: { x: 0, y: 0 },
    battleship: { x: 0, y: 0 },
    cruiser: { x: 0, y: 0 },
    destroyer: { x: 0, y: 0 }
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
    shipCont.style.transform = `translate(${currentPositions[ship.name].x}, ${currentPositions[ship.name].y})`
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
    confirmPlayerCoordinates(result)
  }

  function handleStopDrag(ship) {
    ship.placed = true
    // TODO: deal with the flashing of ships and positioning after installation on the game board
    if (placementResult && placementResult.shipSpansCoord.length > 0) {
      console.log(placementResult)
      const span = placementResult.shipSpansCoord[0]
      const shipCont = document.getElementById(span.spanId).parentElement
      const computedStyle = getComputedStyle(shipCont)
      const transformValue = computedStyle.transform
      const regex = /matrix\((.+), (.+), (.+), (.+), (.+), (.+)\)/
      const matches = transformValue.match(regex)
      // eslint-disable-next-line no-unused-vars
      const [, a, b, c, d, tx, ty] = matches
      const newX = tx
      const newY = ty

      if (placementResult.placementResult) {
        setCurrentPositions(prevCurrentPositions => ({
          ...prevCurrentPositions,
          [ship.name]: { x: newX, y: newY }
        }))
      }

      shipCont.style.transform = 'translate(0, 0)'
      shipCont.style.left = placementResult.placementResult[0].x + 'px'
      shipCont.style.top = placementResult.placementResult[0].y + 'px'
    }
    const containsSpanId = placementResult.shipSpansCoord.some(spanCoord =>
      playerPositions.some(positions => positions[0].spanId === spanCoord.spanId)
    )

    if (!containsSpanId) {
      playerPositions.push(placementResult.shipSpansCoord)
    } else {
      const index = playerPositions.findIndex(positions =>
        positions.some(pos => pos.spanId === placementResult.shipSpansCoord[0].spanId)
      )
      playerPositions[index] = placementResult.shipSpansCoord
    }
  }

  function confirmPlayerCoordinates(handleCoordResult) {
    if (handleCoordResult) {
      const shipSpansCoords = handleCoordResult.shipSpansCoord

      shipSpansCoords.forEach(span => {
        playerSquaresCoord.forEach(square => {
          const xDiff = Math.abs(Math.round(span.x) - Math.round(square.x))
          const yDiff = Math.abs(Math.round(span.y) - Math.round(square.y))
          if (xDiff <= 20 && yDiff <= 20) {
            if (!handleCoordResult.placementResult) {
              handleCoordResult.placementResult = []
            }
            handleCoordResult.placementResult.push(square)
          }
        })
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
        defaultPosition={defaultPositions[ship.name]}
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
