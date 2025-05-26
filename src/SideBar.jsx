import { useState, useTransition } from 'react'
import './SideBar.css'

function SideBar() {
  return(
    <>
      <div className="SideBar">
        <div className="main">
          <div className="top">
            <div className="Sidebutton">New</div>
            <div className="line"></div>
            <div className="Sidebutton">Trending</div>
            <div className="line"></div>
            <div className="Sidebutton">Fashion</div>
            <div className="line"></div>
            <div className="Sidebutton">kys</div>
            <div className="line"></div>
            <div className="Sidebutton">sybau</div>
            <div className="line"></div>
          </div>
          <div className="bottom"></div>
        </div>
       </div>
    </>
  )
}

export default SideBar
