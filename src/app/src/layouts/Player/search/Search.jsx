
import React, { useContext, useState } from 'react'

import { getId } from '../player';
import { PubgApiStatus } from '../PlayerLayout';
import './styles.css'

export default function Search({ setPlayer }) {

  const [name, setName] = useState()
  const [error, setError] = useState({ error: false, message: null })
  const pubgStatus = useContext(PubgApiStatus)

  const submitPlayer = (e) => {
    e.preventDefault()
    console.log(name);
    console.log(pubgStatus);
    if(!pubgStatus) {
      setError({error: true, message: 'Pubg api server is not working'})
      return
    }
    getId(name)
      .then(id => {
        setPlayer({ name: name, id: id })
        setError({ error: false, message: null })
      })
      .catch(err => setError({
        error: true,
        message: err
      }))
  }

  return (
    <section className='search'>
      <form onSubmit={e => submitPlayer(e)}>
        <input type="text" placeholder='Search player' onChange={e => setName(e.target.value)} />
        {error.error && <p className='error'>{error.message}</p>}
      </form>
    </section>
  )
}

