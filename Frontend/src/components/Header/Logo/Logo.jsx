import React from 'react'
import logo from '../../../../src/assets/images/writeAi.png'
import { Link } from 'react-router-dom'

function Logo() {

  return (
    <div>
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          style={{ width: '120px', height: 'auto' }}
        />
      </Link>
    </div>
  )
}

export default Logo
