import React from "react";
import "./BottomBar.css";
import profile from "../images/profile.png";
import cart from "../images/cart-shopping-solid.svg";
import User from "../images/user-regular.svg";
import categories from "../images/magnifying-glass-solid.svg";
import home from "../images/house-solid.svg";
import { useAppContext } from "./AppContext";

function BottomBar() {
  const { isSwitchOn } = useAppContext();

  // Conditional className for the root div or any element you want
  const bottomBarClass = isSwitchOn ? "BottomBar-dark" : "BottomBar";

  return (
    <div className={bottomBarClass}>
      <div className="iconsBB">
        <div>
          <img src={home} alt="Home" />
          <p>Home</p>
        </div>
        <div>
          <img src={categories} alt="Categories" />
          <p>Categories</p>
        </div>
        <div>
          <img
            src={cart}
            alt="Cart"
            onClick={() => {
              const cartdiv = document.getElementById("cartDiv");
              const curproduct = document.getElementById("CurProductDiv");
              const products = document.getElementById("ProductDiv");

              if (products && cartdiv && curproduct) {
                products.className = "products2";
                cartdiv.className = "cart2";
                curproduct.className = "CurProductClosed";
              }
            }}
          />
          <p>Cart</p>
        </div>
        <div>
          <img src={User} alt="Me" />
          <p>Me</p>
        </div>
      </div>
    </div>
  );
}

export default BottomBar;
