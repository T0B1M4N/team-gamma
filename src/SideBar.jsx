import { useState, useTransition } from 'react'
import './SideBar.css'

import { useAppContext } from "./AppContext";

function SideBar() {
  const { isSwitchOn, toggleSwitch } = useAppContext();
  const sidebarclass = isSwitchOn ? "SideBar-dark" : "SideBar";
  const sidebarbuttonclass = isSwitchOn ? "Sidebutton-dark" : "Sidebutton";
  return(
    <>
      <div className={sidebarclass}>
        <div className="main">
          <div className="top">
            <div className={sidebarbuttonclass}>New</div>
            <div className="line"></div>
            <div className={sidebarbuttonclass}>Trending</div>
            <div className="line"></div>
            <div className={sidebarbuttonclass}>Fashion</div>
            <div className="line"></div>
            <div className={sidebarbuttonclass}>kys</div>
            <div className="line"></div>
            <div className={sidebarbuttonclass}>sybau</div>
            <div className="line"></div>
          </div>
          <div className="bottom"></div>
        </div>
       </div>
    </>
  )
}

export default SideBar
