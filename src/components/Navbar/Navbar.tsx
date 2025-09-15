import React from 'react'

const Navbar = () => {
  return (
    <header>
        <nav>
          <ul>
            <li><a className='nav__logo'>Logo aplikacji</a></li>
            <li className='nav__login'>Jan Kowalski</li>
          </ul>
        </nav>
    </header>
  )
}

export default Navbar