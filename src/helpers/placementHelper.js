import { playerSquaresCoord } from 'components/containers/GameSection/GameSection'

export function placementHelper(handleCoordResult) {
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
