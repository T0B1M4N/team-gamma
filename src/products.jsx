import { useEffect, useRef, useState, useTransition } from 'react';
import './products.css';
import salePNG from "../images/salePNG.png"
import arrow from "../images/arrow.png"

function Products() {
  const mainDivRef = useRef(null);
  const productNum = 40;
  const [page, setPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  async function loadDataForPage(pageNumber) {
    const mdiv = mainDivRef.current;

    if (!document.getElementById("text1")) {
      for (let i = 0; i < productNum; i++) {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";

        const imgdiv = document.createElement("div");
        imgdiv.className = "imagediv";
        const image = document.createElement("img");
        image.id = "img" + (i + 1);
        image.className = "image";
        imgdiv.append(image);

        const textdiv = document.createElement("div");
        textdiv.className = "textdiv";
        const currentText = document.createElement("p");
        currentText.id = "text" + (i + 1);
        currentText.className = "text";
        const currentPrice = document.createElement("p");
        currentPrice.id = "price" + (i + 1);
        currentPrice.className = "price";
        const discountImg = document.createElement("img");
        discountImg.className = "discountImg";
        discountImg.id = "discountImg" + (i + 1);
        discountImg.src = salePNG;
        const currentDiscount = document.createElement("p");
        currentDiscount.id = "discount" + (i + 1);
        currentDiscount.className = "discount";
        textdiv.append(currentText);
        textdiv.append(currentDiscount);
        textdiv.append(discountImg);
        textdiv.append(currentPrice);
        itemDiv.append(imgdiv);
        itemDiv.append(textdiv);
        mdiv.append(itemDiv);
      }
    }

    try {
      setLoading(true); // start loading
      const response = await fetch(`https://dummyjson.com/products?limit=${productNum}&skip=${pageNumber * productNum}`);
      const alldata = await response.json();
      const data = alldata.products;
      setTotalProducts(alldata.total);

      for (let i = 0; i < productNum; i++) {
        const itemDiv = mainDivRef.current.children[i];
        const textEl = document.getElementById("text" + (i + 1));
        const priceEl = document.getElementById("price" + (i + 1));
        const discountEl = document.getElementById("discount" + (i + 1));
        const discountImgEl = document.getElementById("discountImg" + (i + 1));
        const imgEl = document.getElementById("img" + (i + 1));

        if (data[i]) {
          itemDiv.style.display = "block";
          let currentName = data[i].title;
          if (currentName.length > 30) currentName = currentName.slice(0, 30) + "...";
          textEl.textContent = currentName;
          priceEl.textContent = data[i].price + "$";
          let raw = data[i].discountPercentage;
          let num = parseFloat(raw);
          let rounded = Math.ceil(num);
          let final = `${rounded}%`;
          discountEl.textContent = data[i].discountPercentage < 10 ? "" : final;
          discountImgEl.src = data[i].discountPercentage < 10 ? "" : salePNG;
          imgEl.src = data[i].images[0];
        } else {
          itemDiv.style.display = "none";
          textEl.textContent = "";
          priceEl.textContent = "";
          discountEl.textContent = "";
          discountImgEl.src = "";
          imgEl.src = "";
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      mainDivRef.current.textContent = "Error loading data";
    } finally {
      setLoading(false); // finished loading
    }
  }

  useEffect(() => {
    loadDataForPage(page);
  }, [page]);

  function handleLeftClick() {
    if (!loading && page > 0) {
      setPage(page - 1);
    }
  }

  function handleRightClick() {
    if (!loading && (page + 1) * productNum < totalProducts) {
      setPage(page + 1);
    }
  }

  // Optional styling for disabled arrows
  const arrowStyle = (disabled) => ({
    cursor: disabled ? "" : 'pointer',
    opacity: disabled ? 0.3 : 1,
    userSelect: 'none',
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
          <img src={arrow} alt="Left" style={{ transform: 'rotate(180deg)' }} />
        </div>
        <div className="pageNum">{page + 1}</div>
        <div
          className="rightarr"
          onClick={handleRightClick}
          style={arrowStyle(loading || (page + 1) * productNum >= totalProducts)}
          title={loading || (page + 1) * productNum >= totalProducts ? "No more pages" : "Next page"}
        >
          <img src={arrow} alt="Right" />
        </div>
      </div>
    </>
  );
}

export default Products;
