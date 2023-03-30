
import React from 'react'

import styles from './PlayerStatsContent.module.css'

export default function StatsContent({ data, gameMode }) {
    if (data) {
        return (
            gameMode === 'ranked' ? <Ranked data={data} /> : <Public data={data} />
        )
    }
}

function Ranked({ data }) {
    if (data.currentTier) {
        return (
            <div className={styles.container}>
                <StatsBox>
                    <h1> wins <span>{data.wins}</span></h1>
                    <p> win rate <span>{Math.round(data.winRatio * 100)}%</span></p>
                    <p> top 10 rate <span>{Math.round(data.top10Ratio * 100)}%</span></p>
                    <p> avg rank <span>{parseFloat(data.avgRank).toFixed(2)}</span></p>
                </StatsBox>
                <StatsBox>
                    <h1> kda <span>{parseFloat(data.kda).toFixed(2)}</span></h1>
                    <p> total kills <span>{data.kills}</span></p>
                    <p> total assists <span>{data.assists}</span></p>
                    <p> demage dealt <span>{data.damageDealt}</span></p>
                </StatsBox>
                <StatsBox>
                    <h1> rank <span>{data.currentTier.tier} {data.currentTier.subTier}</span></h1>
                    <p> matches played <span>{data.roundsPlayed}</span></p>
                    <p> deaths <span>{data.deaths}</span></p>
                    <p> total dbnos <span>{data.dBNOs}</span></p>
                </StatsBox>
            </div>
        )
    }


}

function Public({ data }) {
    return (
        <div className={styles.container}>
            <StatsBox>
                <h1> wins <span>{data.wins}</span></h1>
                <p> top 10 ratio <span>{data.top10s}</span></p>
                <p> survival time <span>{Math.round(data.timeSurvived / 60)} min</span></p>
            </StatsBox>
            <StatsBox>
                <h1> total kills <span>{data.kills}</span></h1>
                <p> total assists <span>{data.assists}</span></p>
                <p> headshot kills <span>{data.headshotKills}</span></p>
            </StatsBox>
            <StatsBox>
                <h1> matches played <span>{data.roundsPlayed}</span></h1>
                <p> round Most Kills <span>{data.roundMostKills}</span></p>
                <p> survival time <span>{Math.round(data.timeSurvived / 60)} min</span></p>
            </StatsBox>
        </div>
    )
}

function StatsBox({ children }) {
    return (
        <div className={styles.box}>
            {children}
        </div>
    )
}


