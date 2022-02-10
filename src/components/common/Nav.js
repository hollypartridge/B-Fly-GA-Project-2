import { Link } from 'react-router-dom'
import React from 'react'

function Nav() {

  return (
    <nav>
      <div className='nav'>
        <div>
          <Link to='/' className='navbar-item'>🦋</Link>
        </div>
        <div className='nav-right'>
          <Link to='/tarot/reading'>Tarot Reading</Link>
          <Link to='/tarot'>All Cards</Link>
          <Link to='/tarot/today'>Card of the Day</Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav