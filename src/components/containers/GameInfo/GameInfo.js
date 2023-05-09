import { gameStages } from 'App'

import { Button } from 'components/ui'

import PlayerShips from '../PlayerShips/PlayerShips'

const GameInfo = ({ gameStage, SetGameStage }) => {
  function stageManagement(stage) {
    if (stage === 'prestart') {
      return (
        <Button
          onClick={() => {
            SetGameStage(gameStages.placement)
            stageManagement(stage)
          }}
          buttonText='Start Game'
        />
      )
    } else if (stage === 'placement') {
      return (
        <>
          <div className='mb-2 w-full h-60 border rounded-md bg-blue-100 border-blue-400 px-2 py-4 flex flex-col gap-2 items-end'>
            <PlayerShips />
          </div>
          <Button
            onClick={() => {
              SetGameStage(gameStages.game)
              stageManagement(stage)
            }}
            buttonText='Ready!'
          />
        </>
      )
    }
  }

  return (
    <div className='flex-auto h-full px-2 flex items-center justify-center flex-col'>{stageManagement(gameStage)}</div>
  )
}

export default GameInfo
