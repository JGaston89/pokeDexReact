import React from 'react'
import css from './header.module.scss'
import * as FaIcons from 'react-icons/fa'
import logo from '../../../assets/poke.png'

export default function Header({obtenerSearch}) {
  return (
    <nav className={css.header}>
        <div className={css.div_header}>
          <div className={css.div_logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={css.div_search}>
          <div>
            <FaIcons.FaSearch />
          </div>

            <input 
            type="serch" 
            onChange={(e) => obtenerSearch(e.target.value)}
            />
          </div>
        </div>
    </nav>
  )
}
