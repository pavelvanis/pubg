import React, { useState } from 'react'

import StatsMenu from '../StatsMenu.module.css'

export default function StatsMenuBox({ toggleBar }) {

    const [active, setActive] = useState(null)

    const handleActive = {
        active: active,
        setActive: (value) => {
            setActive(value)
            toggleBar(value)
        }
    }

    return (
        <div className={StatsMenu.menu}>
            <Box handleActive={handleActive} value='tournaments'>
                Tournaments
            </Box>
            <Box handleActive={handleActive} value='player'>
                Player
            </Box>
        </div>
    )
}


function Box({ handleActive, children, value }) {

    const setActive = () => handleActive.setActive(value)
    const active = handleActive.active

    const handleClick = () => {
        if (active !== value && active !== null) console.log('object');
        setActive(null)
    }

    return (
        <div
            className={`${StatsMenu.box} ${active === value ? StatsMenu.active : ''}`}
            onClick={handleClick}
        >
            {children}
        </div>
    )
}