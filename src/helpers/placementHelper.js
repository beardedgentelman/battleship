import { playerSquaresCoord } from 'components/containers/GameSection/GameSection'

export function placementHelper(handleCoordResult) {
  if (handleCoordResult) {
    const shipSpansCoords = handleCoordResult.shipSpansCoord

    shipSpansCoords.forEach(span => {
      playerSquaresCoord.forEach(square => {
        const xDiff = Math.abs(Math.round(span.x) - Math.round(square.x))
        const yDiff = Math.abs(Math.round(span.y) - Math.round(square.y))
        if (xDiff <= 15 && yDiff <= 15) {
          console.log(square.id)
          console.log('span: ', Math.round(span.x), Math.round(span.y))
          console.log('square: ', square, Math.round(square.x), Math.round(square.y))
        }
      })
    })
  }
}
