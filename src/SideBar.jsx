import { useState, useTransition } from 'react'
import './SideBar.css'

function SideBar() {
  return(
    <>
       <div className="main">
        <div className="top">
          <div className="Sidebutton">1</div>
          <div className="line"></div>
          <div className="Sidebutton">2</div>
          <div className="line"></div>
          <div className="Sidebutton">3</div>
          <div className="line"></div>
          <div className="Sidebutton">4</div>
          <div className="line"></div>
          <div className="Sidebutton">5</div>
          <div className="line"></div>
        </div>
        <div className="bottom"></div>
       </div>
    </>
  )
}

export default SideBar
