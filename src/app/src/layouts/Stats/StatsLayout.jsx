import React, { useEffect, useRef } from 'react'

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
      StatsLayout
    </main>
  )
}
