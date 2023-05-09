import { createContext, useState } from 'react'
// eslint-disable-next-line simple-import-sort/imports
import bgApp from 'assets/bg.jpg'

import { GameInfo, GameSection, Header } from 'components/containers/index.js'

import './index.js'

export const PlayerContext = createContext()
export const gameStages = { prestart: 'prestart', placement: 'placement', game: 'game', endgame: 'endgame' }

function App() {
  const [gameStage, SetGameStage] = useState(gameStages.prestart)

  const appStyle = {
    background: `url(${bgApp}) center/50%`
  }

  return (
    <div className='App w-full px-3 font-jakartaSans text-gray-700' style={appStyle}>
      <Header headerTitle='Sea Battle' />
      <main className='flex items-center justify-between px-10 max-w-7xl mx-auto'>
        <GameInfo gameStage={gameStage} SetGameStage={SetGameStage} />
        <PlayerContext.Provider value={{ playerName: 'You' }}>
          <GameSection playerName='You' id='you' />
        </PlayerContext.Provider>
        <PlayerContext.Provider value={{ playerName: 'Computer' }}>
          <GameSection playerName='Computer' id='computer' />
        </PlayerContext.Provider>
      </main>
    </div>
  )
}

export default App
