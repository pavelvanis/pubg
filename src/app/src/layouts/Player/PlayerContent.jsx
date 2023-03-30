import React, { createContext, useState } from 'react'

import Search from './search/Search'
import Stats from './stats/Stats.jsx'
import styles from './Player.module.css'

export const PlayerContext = createContext({ name: null, id: null })

export default function PlayerContent({ status }) {

  const [player, setPlayer] = useState({ name: null, id: null })

  if (player.name) {
    return (
      <PlayerContext.Provider value={player}>
        <Search setPlayer={setPlayer} status={status} />
        <Stats />
      </PlayerContext.Provider>
    )
  }
  else {
    return (
      <PlayerContext.Provider value={player}>
        <div className={styles.container}>
          <p> Submit player to input</p>
          <Search setPlayer={setPlayer} status={status} />
        </div>
      </PlayerContext.Provider>
    )
  }
}

