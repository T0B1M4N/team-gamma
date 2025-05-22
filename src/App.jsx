import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // překládací hook
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import car1 from "../images/car1.png";
import car2 from "../images/car2.png";
import menu from "../images/menu.png";

function App() {
  return(
    <>
        <div className="menuButton"><img src={menu} alt="" className='menuButtonImg' /></div>
        <div className="Name">StoreName</div>
    </>
  );
}

export default App;
