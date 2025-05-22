import { useState, useTransition } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './TopBar.css'
import car1 from "../images/car1.png"
import car2 from "../images/car2.png"
import menu from "../images/menu.png"
import searchicon from "../images/search-icon.png"

function App() {
  return(
    <>    
        <div className="menuButton"><img src={menu} alt="" className='menuButtonImg' /></div>
        <div className="Name">Store Name</div>
        <div className="searchbar"><img className='searchIcon' src={searchicon}/><input type="search" className='searchbox' /></div>
        <div className="icons"></div>
    </>
  )
}

export default App
