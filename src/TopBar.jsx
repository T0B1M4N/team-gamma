import { useState, useTransition } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './TopBar.css'
import profile from "../images/profile.png"
import cart from "../images/cart.png"
import menu from "../images/menu.png"
import searchicon from "../images/search-icon.png"

function App() {
  return(
    <>    
        <div className="menuButton"><img src={menu} alt="" className='menuButtonImg' /></div>
        <div className="Name">Store Name</div>
        <div className="searchbar"><img className='searchIcon' src={searchicon}/><input type="search" className='searchbox' /></div>
        <div className="icons">
          <img src={cart} alt="" />
          <p>UserProfile</p>
          <img src={profile} alt="" />
        </div>
    </>
  )
}

export default App
