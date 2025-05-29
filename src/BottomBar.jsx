import React, { useEffect, useState } from "react";
import "./BottomBar.css";
import profile from "../images/profile.png";
import cart from "../images/cart-shopping-solid.svg";
import User from "../images/user-regular.svg";
import categories from "../images/magnifying-glass-solid.svg";
import home from "../images/house-solid.svg";
import { useAppContext } from "./AppContext";
import TagPopup from "./TagPopup.jsx";

function scrollToTop(duration = 500) {
  const start = window.scrollY || window.pageYOffset;
  const startTime = performance.now();
  function scrollStep(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start * (1 - progress));
    if (progress < 1) requestAnimationFrame(scrollStep);
  }
  requestAnimationFrame(scrollStep);
}

function BottomBar() {
  const { isSwitchOn } = useAppContext();
  const [showPopup, setShowPopup] = useState(false);
  const [tags, setTags] = useState([]);

  const handleMenuClick = () => {
    const products = document.getElementById("ProductDiv");
    const cartdiv = document.getElementById("cartDiv");
    const curproduct = document.getElementById("CurProductDiv");
    if (products && cartdiv && curproduct) {
      products.className = isSwitchOn ? "products-dark" : "products";
      cartdiv.className = "cart";
      curproduct.className = "CurProductClosed";
    }
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        const allTags = [...new Set(data.products.flatMap(p => p.tags || []))];
        setTags(allTags);
      })
      .catch(err => console.error("Error loading tags:", err));
  }, []);

  const bottomBarClass = isSwitchOn ? "BottomBar-dark" : "BottomBar";

  const handleCartClick = () => {
    const products = document.getElementById("ProductDiv");
    const cartdiv = document.getElementById("cartDiv");
    const curproduct = document.getElementById("CurProductDiv");
    if (products && cartdiv) {
      products.className = isSwitchOn ? "products2-dark" : "products2";
      cartdiv.className = "cart2";
      curproduct.className = "CurProductClosed";
      scrollToTop(250);
    }
  };

  return (
    <>
      <div className={bottomBarClass}>
        <div className="iconsBB">
          <div>
            <img src={home} onClick={handleMenuClick} alt="Home" />
            <p>Home</p>
          </div>
          <div onClick={() => setShowPopup(true)}>
            <img src={categories} alt="Categories" />
            <p>Categories</p>
          </div>
          <div>
            <img
              src={cart}
              alt="Cart"
              onClick={handleCartClick}
            />
            <p>Cart</p>
          </div>
          <div>
            <img src={User} alt="Me" />
            <p>Me</p>
          </div>
        </div>
      </div>

      <TagPopup tags={tags} visible={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}

export default BottomBar;
