import React, { useState } from "react";
import cart from "../images/cart-shopping-solid.svg";
import User from "../images/user-regular.svg";
import menu from "../images/menu.png";
import searchicon from "../images/search-icon.png";
import { useAppContext } from "./AppContext";
import "./TopBar.css";
import "./OpenSourceCssStuff.css"

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

function TopBar() {
  const { isSwitchOn, toggleSwitch, searchQuery, setSearchQuery } = useAppContext(); 
  const TopBarClass = isSwitchOn ? "TopBar-dark" : "TopBar";
  const [showUserPopup, setShowUserPopup] = useState(false);

  const toggleUserPopup = () => setShowUserPopup((prev) => !prev);

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

  const handleUserClick = () => {
    const products = document.getElementById("ProductDiv");
    const cartdiv = document.getElementById("cartDiv");
    if (products && cartdiv) {
      products.className = isSwitchOn ? "products2-dark" : "products2";
      cartdiv.className = "cart2";
    }
  };
  const handleUserpageClick = () => {
    const userpagediv = document.getElementById("userpageDiv");
    userpagediv.className = isSwitchOn ? "userpagediv-dark": "userpagediv"
  };

  return (
    <div className={TopBarClass}>
      <div className="mobileDevider">
        <div className="topTB">
          <div className="menuButton">
            <img
              src={menu}
              alt="Menu"
              className="menuButtonImg"
              onClick={handleMenuClick}
            />
          </div>

         {/* Minecraft-style Switch */}
          <label className="switch">
            <input
              type="checkbox"
              checked={isSwitchOn}
              onChange={toggleSwitch}
            />
            <span className="slider">
              <span className="off"></span>
              <span className="on"></span>
            </span>
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIG/8QAIxAAAgIABQQDAAAAAAAAAAAAAQMCBAAREiExBUFRcROBsf/EABQBAQAAAAAAAAAAAAAAAAAAAAX/xAAWEQADAAAAAAAAAAAAAAAAAAAAEiL/2gAMAwEAAhEDEQA/AMBTp03dNglMVuttjqnKQ2UPOfntkOThbqVVUJ12BKnogZQZpy+Ucc8knwePWJrWqyqEHVmrTahEBqpbBoAH1n635wt3a9mjN1p8X2pw0qVEbKB/CO/c4OphSVP/2Q=="
              className="off"
              alt="off"
            />
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIEBf/EACMQAAEDAwQDAQEAAAAAAAAAAAQBAgUDESEAEjFBBlFhMkL/xAAUAQEAAAAAAAAAAAAAAAAAAAAF/8QAGBEAAwEBAAAAAAAAAAAAAAAAABIiMUH/2gAMAwEAAhEDEQA/AM+Bg4mS8coRccMOdNG01qVyH/kRvHPKKmMdr8uujPwUTG+NkRpw1AKWCbvHKa2zTGphc9u9p0q+rLqeMl4kSCGkYgtoE0HTahIz3bWGNanPrdyqWzn7p5ibh5CArnyZNMyVLpK0QSkt2BNXtVX+7ol1wuLJiyaHt+6Kyp//2Q=="
              className="on"
              alt="on"
            />
          </label>

          <div className="Name">Store Name</div>

          <div className="searchbar">
            <img className="searchIcon" src={searchicon} alt="Search" />
            <input
              type="search"
              className="searchbox"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
            />
          </div>

          <div className="icons">
            <img
              src={cart}
              alt="Cart"
              className="menuButtonImg highlightable"
              onClick={handleCartClick}
            />
            <img
              src={User}
              alt="User"
              className="menuButtonImg highlightable"
              onClick={handleUserpageClick}
            />
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
    </div>
  );
}

export default TopBar;
