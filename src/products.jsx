// Products.jsx
import React, { useEffect, useRef, useState } from "react";
import salePNG from "../images/salePNG.png";
import arrow from "../images/arrow.png";
import { ChangeId } from "./CurrentProduct.jsx";
import { loadProducts } from "./ProductData";
import "./products.css"

function Products() {
  const mainDivRef = useRef(null);
  const productNum = 40;
  const [page, setPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  function scrollToTop(duration = 500) {
  const start = window.scrollY || window.pageYOffset;
  const startTime = performance.now();

  function scrollStep(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start * (1 - progress));
    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

  // Load products once, then paginate locally
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const allProducts = await loadProducts();
      setProducts(allProducts);
      setTotalProducts(allProducts.length);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Render products for current page
  useEffect(() => {
    if (!products.length) return;

    const container = mainDivRef.current;
    container.innerHTML = ""; // clear old content

    const startIndex = page * productNum;
    const endIndex = Math.min(startIndex + productNum, products.length);

    for (let i = startIndex; i < endIndex; i++) {
      const product = products[i];

      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.id = `product-${product.id}`;

      const imgDiv = document.createElement("div");
      imgDiv.className = "imagediv";

      const image = document.createElement("img");
      image.src = product.images[0];
      image.className = "image";
      imgDiv.appendChild(image);

      const textDiv = document.createElement("div");
      textDiv.className = "textdiv";

      const currentText = document.createElement("p");
      currentText.className = "text";
      let title = product.title;
      if (title.length > 30) title = title.slice(0, 30) + "...";
      currentText.textContent = title;

      const currentPrice = document.createElement("p");
      currentPrice.className = "price";
      currentPrice.textContent = `${product.price}$`;

      const discountEl = document.createElement("p");
      discountEl.className = "discount";
      const discount = product.discountPercentage;
      discountEl.textContent = discount >= 10 ? `${Math.ceil(discount)}%` : "";

      const discountImg = document.createElement("img");
      discountImg.className = "discountImg";
      discountImg.src = discount >= 10 ? salePNG : "";

      textDiv.appendChild(currentText);
      textDiv.appendChild(discountEl);
      textDiv.appendChild(discountImg);
      textDiv.appendChild(currentPrice);

      itemDiv.appendChild(imgDiv);
      itemDiv.appendChild(textDiv);

      // Onclick handler calls ChangeId with product id
      itemDiv.onclick = () => {
        const productsDiv = document.getElementById("ProductDiv");
        const CurProductDiv = document.getElementById("CurProductDiv");
        if (productsDiv) productsDiv.className = "products2";
        if (CurProductDiv) CurProductDiv.className = "CurProductOpen";
        ChangeId(product.id);
        scrollToTop(250);
      };

      container.appendChild(itemDiv);
    }
  }, [page, products]);

  function handleLeftClick() {
    if (!loading && page > 0) setPage(page - 1);
  }

  function handleRightClick() {
    if (!loading && (page + 1) * productNum < totalProducts) setPage(page + 1);
  }

  const arrowStyle = disabled => ({
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.3 : 1,
    userSelect: "none"
  });

  return (
    <>
      <div id="mainDiv" ref={mainDivRef} className="mainDiv"></div>
      <div className="pages">
        <div
          className="leftarr"
          onClick={handleLeftClick}
          style={arrowStyle(loading || page === 0)}
          title={loading || page === 0 ? "Cannot go back" : "Previous page"}
        >
          <img src={arrow} alt="Left" style={{ transform: "rotate(180deg)" }} />
        </div>
        <div className="pageNum">{page + 1}</div>
        <div
          className="rightarr"
          onClick={handleRightClick}
          style={arrowStyle(loading || (page + 1) * productNum >= totalProducts)}
          title={
            loading || (page + 1) * productNum >= totalProducts
              ? "No more pages"
              : "Next page"
          }
        >
          <img src={arrow} alt="Right" />
        </div>
      </div>
    </>
  );
}

export default Products;
