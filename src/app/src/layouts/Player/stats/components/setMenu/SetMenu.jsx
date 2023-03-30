
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

import styles from './PlayerSetMenu.module.css'

export default function SetMenu({ setSeason, season, gameMode, setGameMode }) {

  const load = useRef(false)
  const rootRef = useRef(null);

  const [active, setActive] = useState(false)
  const [seasonList, setSeasonList] = useState()

  const submitSeason = (s) => {
    setActive(false)
    setSeason(s)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) setActive(false)
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [rootRef]);

  useEffect(() => {
    if (load.current === true) {
      GetSeasons()
        .then(res => {
          setSeasonList(res.reverse())
          return res
        })
        .then(res => {
          if (!season) {
            const s = res.filter(s => s.value !== season.value)
            setSeason(s)
          }
        })
    }
    return () => load.current = true
  }, [])

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


function GetSeasons() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_PORT}/api/season`)
      //.get(`/api/season`)
      .then(res => {
        console.log('seasons was loaded in setMenu');
        resolve(res.data.data)
      })
      .catch(err => reject(err))
  })
}


