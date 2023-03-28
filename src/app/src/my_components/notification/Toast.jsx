import { useMemo } from 'react'
import styles from './style.module.css'

export const Toast = ({ mode, onClose, message }) => {

  const classes = useMemo(
    () => [styles.toast, styles[mode]].join(' '),
    [mode],
  )

  

  return (
    <div onClick={onClose} className={classes}>
      {message}
    </div>
  )
}
