import React from 'react'

import Header from '../DefaultLayout/Header/Header'
import styles from './Error.module.css'

export default function Error() {
  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          Error
        </div>
      </main>
    </>
  )
}

