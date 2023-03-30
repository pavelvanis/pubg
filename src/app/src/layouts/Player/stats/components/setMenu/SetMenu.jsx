
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

import styles from './PlayerSetMenu.module.css'

export default function SetMenu({ setSeason, season, gameMode, setGameMode, seasonList }) {

  const rootRef = useRef(null);

  const [active, setActive] = useState(false)

  const submitSeason = (s) => {
    setActive(false)
    setSeason(s)
  }

  seasonList.reverse()

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) setActive(false)
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [rootRef]);

  return (
    <div className={styles.container}>
      <h1><span className={styles.season}>Season {season.value}</span> | {gameMode}</h1>
      <div className={styles.options}>
        <GameModeButtons gameMode={gameMode} setGameMode={setGameMode} />
        <div className={styles.seasonContainer} ref={rootRef}>
          <button className={active ? styles.activeSeasonButton : styles.seasonButton} onClick={() => setActive(!active)}>
            Season {season.value}
          </button>
          {active ? <SeasonList season={season} setSeason={submitSeason} seasonList={seasonList} /> : null}
        </div>
      </div>
    </div>
  )
}


function GameModeButtons({ gameMode, setGameMode }) {
  return (
    <div className={styles.gameMode}>
      <button className={gameMode === 'ranked' ? styles.active : null} onClick={() => setGameMode('ranked')}>ranked</button>
      <button className={gameMode === 'public' ? styles.active : null} onClick={() => setGameMode('public')}>public</button>
    </div>
  )
}


function SeasonList({ season, seasonList, setSeason }) {
  const list = seasonList.filter(s => s.value != season.value)
  console.log(list);
  if (list) {
    return (
      <div className={styles.seasonList}>
        {
          list.map(s => (
            <button key={s.value} onClick={() => setSeason(s)} >Season {s.value}</button>
          ))
        }
      </div>
    )
  }
}

