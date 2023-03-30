import React, { useEffect, useRef } from 'react'

import styles from './StatsLayout.module.css'

export default function StatsLayout() {

  const load = useRef(false)

  useEffect(() => {
    if(load.current === true){
      console.log('env');
      console.log(process.env);
    }

    return () => load.current = true
  }, [])

  return (
    <main>
      <div className='container'>
        <p className={styles.notWorking}>This page is not working for now</p>
      </div>
    </main>
  )
}
