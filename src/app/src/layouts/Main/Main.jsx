import React from 'react'

import styles from './Main.module.css'

export default function Main() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Welcome</h1>
          <p>On this page you can search the statistics of individual pubg players</p>
        </div>
      </div>
    </main>
  )
}
