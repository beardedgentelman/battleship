import { computerSquaresCoord } from 'components/containers/GameSection/GameSection'

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

export function generateComputerRandomCoord() {
  const randomPositions = []

  for (const ship of ships) {
    const { length } = ship

    const availableSquares = computerSquaresCoord.filter(square => {
      const column = square.id.charAt(0)
      return column >= 'A' && column <= 'J'
    })

    if (availableSquares.length < length) {
      return
    }

    const randomIndex = Math.floor(Math.random() * (availableSquares.length - length + 1))
    const shipPositions = availableSquares.slice(randomIndex, randomIndex + length)

    const isHorizontal = Math.random() < 0.5
    if (!isSamePlane(shipPositions, isHorizontal)) {
      return
    }

    randomPositions.push(shipPositions)

    ship.placed = true
  }

  console.log(randomPositions)

  return randomPositions
}

function isSamePlane(positions, isHorizontal) {
  if (isHorizontal) {
    const row = positions[0].row
    return positions.every(position => position.row === row)
  } else {
    const col = positions[0].col
    return positions.every(position => position.col === col)
  }
}
