
import React, { useEffect } from 'react'

import styles from './PlayerModeMenu.module.css'

export default function ModeMenu({ data, mode, setMode }) {

  useEffect(() => {
    if (data) {
      Object.keys(data).includes('squad-fpp')
        ? Object.keys(data).map(i => i === 'squad-fpp' ? setMode(i) : null)
        : setMode(Object.keys(data)[0])
    }
  }, [data])

  return (
    <div className={styles.container}>
      <ModeList data={data} mode={mode} setMode={setMode} />
    </div>
  )
}

function ModeList({ data, mode, setMode }) {

  if (data) {
    return (
      <div className={styles.options}>
        {
          Object.keys(data).map(item => (
            item === mode ? <button className={styles.active} key={item}>{item}</button>
              : <button className={styles.option} key={item} onClick={() => setMode(item)}>{item}</button>
          ))
        }
      </div>
    )
  }
}
