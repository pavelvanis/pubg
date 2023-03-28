
import axios from 'axios'
import React, { createContext, useEffect, useRef, useState } from 'react'

export const StatsTournamentContext = createContext()

export const StatsTournamentProvider = ({ children }) => {

    const [tournaments, setTournaments] = useState({})

    const getTournaments = async () => {
        const { data } = await axios.get('http://localhost:8080/api/stats/tournaments')
        setTournaments(data)
    }

    const load = useRef(false)

    useEffect(() => {
        if (load.current === true) {
            getTournaments()
        }
        return () => load.current = true
    }, [])

    return (
        <StatsTournamentContext.Provider value={tournaments}>
            {children}
        </StatsTournamentContext.Provider>
    )
}
