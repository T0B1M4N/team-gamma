import { useState, useTransition } from 'react';
import './BottomBar.css';
import profile from "../images/profile.png";
import cart from "../images/cart-shopping-solid.svg";
import User from "../images/user-regular.svg"
import categories from "../images/magnifying-glass-solid.svg"
import home from "../images/house-solid.svg"

function App() {
  return (
    <>    
      <div className="iconsBB">
        <div>
          <img src={home} alt="" />
          <p>Home</p>
        </div>
        <div>
          <img src={categories} alt="" />
          <p>Categories</p>
        </div>
        <div>
          <img src={cart} alt="" />
          <p>Cart</p>
        </div>
        <div>
          <img src={User} alt="" />
          <p>Me</p>
        </div>
      </div>
    </>
  );
}

export default App;
