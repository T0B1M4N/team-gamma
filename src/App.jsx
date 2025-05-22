import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // překládací hook
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import car1 from "../images/car1.png";
import car2 from "../images/car2.png";
import menu from "../images/menu.png";

function App() {
  const { t } = useTranslation(); // získání funkce `t` pro překlady

  const [imageSrc, setImageSrc] = useState(car2);
  const [Currentsize, ] = useState("200px");
  const [MenuOpen, ChangeMenuOpen] = useState(false);
  const [MenuCurrentsize, Menusetsize] = useState("0px");
  const [MenuTextSize, ChangeMenuTextSize] = useState("0px");

  const menuStyle = {
    width: MenuCurrentsize,
  };

  return (
    <>
      <div>
        <div className='Menu' style={menuStyle}>
          <a className='MenuOption' href="../first.html">
            <p style={{ fontSize: MenuTextSize }}>{t('menu.first')}</p>
          </a>
          <div className="MenuOption"><p style={{ fontSize: MenuTextSize }}>{t('menu.second')}</p></div>
          <div className="MenuOption"><p style={{ fontSize: MenuTextSize }}>{t('menu.third')}</p></div>
          <div className="MenuOption"><p style={{ fontSize: MenuTextSize }}>{t('menu.fourth')}</p></div>
        </div>

        <div className='TopBar'>
          <div className='MenuDiv'>
            <img
              className="MenuButton"
              src={menu}
              alt="Menu"
              onClick={() => {
                if (!MenuOpen) {
                  ChangeMenuOpen(true);
                  Menusetsize("200px");
                  ChangeMenuTextSize("20px");
                } else {
                  ChangeMenuOpen(false);
                  Menusetsize("0px");
                  ChangeMenuTextSize("0px");
                }
              }}
            />
          </div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <h1>{t('title')}</h1>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </div>

      <div className="card">
        <div className='carText'>{t('hover_instruction')}</div>
        <div className="carbox">
          <img
            src={imageSrc}
            alt="Swappable"
            className='carImage'
            width={Currentsize}
            height={Currentsize}
            onMouseOver={() => setImageSrc(car1)}
            onMouseLeave={() => setImageSrc(car2)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
