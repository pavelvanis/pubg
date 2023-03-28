import React from 'react'
import { StatsTournamentProvider } from '../../context/StatsTournamentProvider'

import StatsContent from './components/content/StatsContent'
import StatsMenu from './components/menu/StatsMenu'

import styles from './StatsLayout.module.css'

export default function StatsLayout() {

  return (
    <main>
      <StatsTournamentProvider>
        <div className={styles.container}>
          <StatsMenu />
          <StatsContent />
        </div>
      </StatsTournamentProvider>
    </main>
  )
}
