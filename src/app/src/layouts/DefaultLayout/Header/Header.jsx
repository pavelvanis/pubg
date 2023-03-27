import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

import './header.css'

export default function Header() {
  return (
    <header>

      <a id='site-logo' href="/" />
      <nav id='mainMenu'>
        <ul className='main-menu'>
          <li><Link to='/player'>Player</Link></li>
          <li><Link to='/stats'>Stats</Link></li>
        </ul>
      </nav>

    </header>
  )
}
