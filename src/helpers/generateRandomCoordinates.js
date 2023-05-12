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
  const computerPositions = []

  for (const ship of ships) {
    const { length } = ship

    const availableSquares = computerSquaresCoord.filter(
      square => !computerPositions.some(position => position.id === square.id)
    )

    if (availableSquares.length < length) {
      return
    }

    const randomIndex = Math.floor(Math.random() * (availableSquares.length - length + 1))

    const orientation = getRandomOrientation()
    let shipPositions = []

    if (orientation === 'horizontal') {
      shipPositions = horizontalPositions(availableSquares, randomIndex, length)
    } else {
      shipPositions = verticalPositions(availableSquares, randomIndex, length)
    }

    if (shipPositions === null) {
      return
    }

    computerPositions.push(shipPositions)
    ship.placed = true
  }

  return computerPositions
}

function verticalPositions(availableSquares, randomIndex, length) {
  let shipPosition = null
  const squareId = availableSquares[randomIndex].id

  const matches = squareId.match(/\d+/)

  const number = parseInt(matches[0])

  if (number > 7 && length > 1) {
    if (number === 8) {
      if (length === 4) {
        shipPosition = []
        for (let i = 0; i < length; i++) {
          const newNumber = number - 1 - i
          const newId = squareId.replace(/\d+/, newNumber)
          const position = availableSquares.find(square => square.id === newId)
          shipPosition.push(position)
        }
      }
    } else if (number === 9) {
      if (length === 4) {
        shipPosition = []
        for (let i = 0; i < length; i++) {
          const newNumber = number - 2 - i
          const newId = squareId.replace(/\d+/, newNumber)
          const position = availableSquares.find(square => square.id === newId)
          shipPosition.push(position)
        }
      } else if (length === 3) {
        shipPosition = []
        for (let i = 0; i < length; i++) {
          const newNumber = number - 1 - i
          const newId = squareId.replace(/\d+/, newNumber)
          const position = availableSquares.find(square => square.id === newId)
          shipPosition.push(position)
        }
      }
    } else if (number === 10) {
      if (length === 4) {
        shipPosition = []
        for (let i = 0; i < length; i++) {
          const newNumber = number - 3 - i
          const newId = squareId.replace(/\d+/, newNumber)
          const position = availableSquares.find(square => square.id === newId)
          shipPosition.push(position)
        }
      } else if (length === 3) {
        shipPosition = []
        for (let i = 0; i < length; i++) {
          const newNumber = number - 2 - i
          const newId = squareId.replace(/\d+/, newNumber)
          const position = availableSquares.find(square => square.id === newId)
          shipPosition.push(position)
        }
      } else if (length === 2) {
        shipPosition = []
        for (let i = 0; i < length; i++) {
          const newNumber = number - 1 - i
          const newId = squareId.replace(/\d+/, newNumber)
          const position = availableSquares.find(square => square.id === newId)
          shipPosition.push(position)
        }
      }
    }
  } else {
    shipPosition = []
    for (let i = 0; i < length; i++) {
      const newNumber = number + i
      const newId = squareId.replace(/\d+/, newNumber)
      const position = availableSquares.find(square => square.id === newId)
      shipPosition.push(position)
    }
  }

  return shipPosition
}

function horizontalPositions(availableSquares, randomIndex, length) {
  let shipPosition = null
  const squareId = availableSquares[randomIndex].id

  if (squareId.includes('J') && length > 1) {
    if (length === 2) {
      const newIndex = randomIndex - 1
      shipPosition = availableSquares.slice(newIndex, newIndex + length)
    } else if (length === 3) {
      const newIndex = randomIndex - 2
      shipPosition = availableSquares.slice(newIndex, newIndex + length)
    } else if (length === 4) {
      const newIndex = randomIndex - 3
      shipPosition = availableSquares.slice(newIndex, newIndex + length)
    }
  } else if (squareId.includes('I') && length > 2) {
    if (length === 3) {
      const newIndex = randomIndex - 1
      shipPosition = availableSquares.slice(newIndex, newIndex + length)
    } else if (length === 4) {
      const newIndex = randomIndex - 2
      shipPosition = availableSquares.slice(newIndex, newIndex + length)
    }
  } else if (squareId.includes('H') && length > 3) {
    const newIndex = randomIndex - 1
    shipPosition = availableSquares.slice(newIndex, newIndex + length)
  } else {
    shipPosition = availableSquares.slice(randomIndex, randomIndex + length)
  }

  return shipPosition
}

function getRandomOrientation() {
  const randomNum = Math.random()

  if (randomNum < 0.5) {
    return 'vertical'
  } else {
    return 'horizontal'
  }
}
