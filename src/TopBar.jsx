import { use, useState, useTransition } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './TopBar.css'
import cart from "../images/cart-shopping-solid.svg";
import User from "../images/user-regular.svg"
import menu from "../images/menu.png"
import searchicon from "../images/search-icon.png"

function App() {
  const products = document.getElementById("ProductDiv")
  const cartdiv = document.getElementById("cartDiv")
  const [showUserPopup, setShowUserPopup] = useState(false);
  const toggleUserPopup = () => {
    setShowUserPopup(!showUserPopup);
  };
  const curproduct = document.getElementById("CurProductDiv")
  return(
    <>    
        <div className="mobileDevider">
          <div className="topTB">
            <div className="menuButton"><img src={menu} alt="" className='menuButtonImg' 
            onClick={() => {
                   products.className = "products";
                    cartdiv.className = "cart";
                    curproduct.className = "CurProductClosed";
                  }}
                  />
                  </div>
            <div className="Name">Store Name</div>
            <div className="searchbar"><img className='searchIcon' src={searchicon}/><input type="search" className='searchbox' /></div>
            <div className="icons">
                <img src={cart} alt="Cart" className='menuButtonImg highlightable' onClick={() => {
                   products.className = "products2";
                  cartdiv.className = "cart2";
                  }}/>
              <p>UserProfile</p>
              <img src={User} alt="User" className='menuButtonImg highlightable'
                {showUserPopup && (
                  <div className="userPopup">
                    <p>Account</p>
                    <p>Settings</p>
                    <p>Logout</p>
                  </div>
                )}/>
              </div>
          </div>
          <div className="bottomTB">
            <div className="buttonTB">New</div>
            <div className="buttonTB">Trending</div>
            <div className="buttonTB">Fashion</div>
            <div className="buttonTB">kys</div>
            <div className="buttonTB">sybau</div>
          </div>
        </div>
    </>
  )
}

export default App
