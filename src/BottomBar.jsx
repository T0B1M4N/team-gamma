import React, { useEffect, useRef, useState } from "react";
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
  const [showBottomPopup, setShowBottomPopup] = useState(false);
  const bottomPopupRef = useRef(null);

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

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const allTags = [...new Set(data.products.flatMap((p) => p.tags || []))];
        setTags(allTags);
      })
      .catch((err) => console.error("Error loading tags:", err));
  }, []);

  // Close bottom popup on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        bottomPopupRef.current &&
        !bottomPopupRef.current.contains(event.target)
      ) {
        setShowBottomPopup(false);
      }
    };
    if (showBottomPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showBottomPopup]);

  const bottomBarClass = isSwitchOn ? "BottomBar-dark" : "BottomBar";

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
            <img src={cart} alt="Cart" onClick={handleCartClick} />
            <p>Cart</p>
          </div>
          <div>
            <img
              src={User}
              alt="Me"
              onClick={() => setShowBottomPopup((prev) => !prev)}
            />
            <p>Me</p>
          </div>

          {showBottomPopup && (
            <div
              className="bottom-popup-container-2"
              ref={bottomPopupRef}
            >
              <div
                className={isSwitchOn ? "bottom-popup-dark-2" : "bottom-popup-2"}
              >
                <ul>
                  <li>
                    <button onClick={() => alert("Profile")}>Profile</button>
                  </li>
                  <li>
                    <button onClick={() => alert("Logging out..")}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <TagPopup tags={tags} visible={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}

export default BottomBar;
