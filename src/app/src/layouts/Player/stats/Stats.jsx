import React, { useContext, useEffect, useRef, useState } from 'react'

import { PlayerContext } from '../PlayerContent'
import SetMenu from './components/setMenu/SetMenu'
import ModeMenu from './components/modeMenu/ModeMenu'
import StatsContent from './components/statsContent/StatsContent'

import StatsClass from './stats.js'

import styles from './PlayerStats.module.css'
import axios from 'axios'

export default function Stats() {

    const player = useContext(PlayerContext)
    const [seasonList, setSeasonsList] = useState([])
    const load = useRef(false)

    const [season, setSeason] = useState()
    const [gameMode, setGameMode] = useState('public')
    const [mode, setMode] = useState()
    const [data, setData] = useState()


    const getStats = () => {
        if (player.name && season) {
            getData(player.name, player.id, season, gameMode, mode)
                .then(res => setData(res))
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        GetSeasons()
            .then(res => {
                res.reverse()
                console.log(res);
                setSeasonsList(res)
                const currentSeason = res.filter(s => s.isCurrent)
                setSeason(currentSeason[0])
            })
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        const currentSeason = seasonList.filter(s => s.isCurrent)
        setSeason(currentSeason[0])
    }, [player.name])

    useEffect(() => {
        if (load.current === true) {
            getStats()
        }

        return () => load.current = true
    }, [player.name, gameMode, season])

    if (data) {
        return (
            <section className={'stats'}>
                <h1 className={styles.player}>{player.name}</h1>
                <div className={styles.optionsMenu}>
                    <SetMenu setSeason={setSeason} season={season} seasonList={seasonList} gameMode={gameMode} setGameMode={setGameMode} />
                    <ModeMenu data={data} mode={mode} setMode={setMode} />
                </div>
                <StatsContent data={data[mode]} gameMode={gameMode} />
            </section>
        )
    } else {
        return (
            <div>
                loading
            </div>
        )
    }
}

function getData(name, id, season, gameMode, mode) {
    return new Promise((resolve, reject) => {
        new StatsClass({
            name: name,
            accountId: id,
            season: season,
            gameMode: gameMode,
            mode: mode
        }).load()
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

function GetSeasons() {
    return new Promise((resolve, reject) => {
        axios
            //.get(`${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_PORT}/api/season`)
            .get(`/api/season`)
            .then(res => {
                resolve(res.data.data)
                console.log(res.data);
            })
            .catch(err => reject(err))
    })
}


