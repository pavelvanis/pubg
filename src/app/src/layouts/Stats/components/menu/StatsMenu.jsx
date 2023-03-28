import React, { useContext, useEffect, useRef } from 'react'
import { StatsTournamentContext } from '../../../../context/StatsTournamentProvider'

import styles from './StatsMenu.module.css'

export default function Test() {

    const value = useContext(StatsTournamentContext)

    const load = useRef(false)

    useEffect(() => {
        if (load.current === true) {
            console.log(value);
        }
        return () => load.current = true
    }, [value])

    return (
        <div className={styles.container}>
            StatsMenu
        </div>
    )
}
