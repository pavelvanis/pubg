import React, { createContext, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from "uuid"
import axios from 'axios'

import { ToastPortal } from '../../my_components/notification'
import PlayerContent from './PlayerContent'

export const PubgApiStatus = createContext()

export default function PlayerLayout() {

  const load = useRef(false)
  const toastRef = useRef()
  const [status, setStatus] = useState(null)

  const loadedToast = useRef({ loaded: false, id: null })

  const addToast = (toast) => {
    toastRef.current.addToast(toast)
  }
  const removeToast = (id) => {
    toastRef.current.removeToast(id)
  }

  const handleStatus = async () => {
    const serverStatus = await getStatusSync();
    if (!serverStatus && !loadedToast.current.loaded) {
      loadedToast.current.id = uuid()
      addToast({
        id: loadedToast.current.id,
        mode: 'error',
        message: 'Bad connection with pubg server',
        canClose: false
      })
      loadedToast.current.loaded = true
    }
    else {
      if (serverStatus && loadedToast.current.loaded) {
        removeToast(loadedToast.current.id)
        loadedToast.current = { loaded: false, id: null }
      }
    }
    setStatus(serverStatus);
  }

  useEffect(() => {
    if (load.current === true) {
      handleStatus();
      console.log(status);
    }
    const interval = setInterval(() => {
      handleStatus()
    }, 2000)

    return () => {
      clearInterval(interval)
      load.current = true
    }
  }, [])


  return (
    <main>
      <PubgApiStatus.Provider value={status}>
        <PlayerContent />
      </PubgApiStatus.Provider>
      <ToastPortal ref={toastRef} />
    </main>
  )
}

async function getStatusSync() {
  try {
    const res = await axios.get('https://api.pubg.com/status');
    return res.status === 200;
  } catch (err) {
    return false;
  }
}
