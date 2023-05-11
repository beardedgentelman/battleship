import { useEffect, useState } from 'react'
// eslint-disable-next-line simple-import-sort/imports
import { generateComputerRandomCoord } from 'helpers/generateRandomCoordinates'

const ComputerShips = () => {
  const [shipPositions, setShipPositions] = useState([])

  useEffect(() => {
    const randomPositions = generateComputerRandomCoord()
    setShipPositions(randomPositions)
  }, [])

  return <div></div>
}

export default ComputerShips
