import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="nav-wrapper blue darken-1 px1">
        <NavLink to="/" className="brand-logo">
          JOGO DA VELHA
        </NavLink>
        <ul className="right hide-on-med-and-down">
          <li cy-data="home-nav-link">
            <NavLink to="/">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/list">GAMES</NavLink>
          </li>
          <li>
            <NavLink to="/about">LEIA ME</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
