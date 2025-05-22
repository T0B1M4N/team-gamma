import { useEffect, useRef } from 'react';
import './products.css';
import salePNG from "../images/salePNG.png"
import arrow from "../images/arrow.png"

function Products() {
  const mainDivRef = useRef(null);
  const productNum = 40;

  useEffect(() => {
    async function addDivsAndLoadData() {
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
          textdiv.append(discountImg)
          textdiv.append(currentPrice);
          itemDiv.append(imgdiv);
          itemDiv.append(textdiv);
          mdiv.append(itemDiv);
        }
      }

      try {
        const response = await fetch("https://dummyjson.com/products?limit=50");
        const alldata = await response.json();
        const data = alldata.products

        for (let i = 0; i < productNum; i++) {
          let currentName = data[i].title;
          if (currentName.length > 30) {
          currentName = currentName.slice(0, 30) + "...";
          }
          document.getElementById("text" + (i + 1)).textContent = currentName;
          document.getElementById("price" + (i + 1)).textContent = (data[i].price+"$");
          let raw = data[i].discountPercentage;
          let num = parseFloat(raw);         // 12.34
          let rounded = Math.ceil(num);      // 13
          let final = `${rounded}%`; 
          document.getElementById("discount" + (i + 1)).textContent = (final);
          if (data[i].discountPercentage < 10) {
            document.getElementById("discount" + (i + 1)).textContent = "";
            document.getElementById("discountImg" + (i + 1)).src = ""
          }
          document.getElementById("img" + (i + 1)).src = data[i].images[0];
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        mdiv.textContent = "Error loading data";
      }
    }

    addDivsAndLoadData();
  }, []);

  return (
    <>
      <div id="mainDiv" ref={mainDivRef} className="mainDiv"></div>
      <div className="pages">
        <div className="leftarr"><img src={arrow} alt="" /></div>
        <div className="pageNum">1</div>
        <div className="rightarr"><img src={arrow} alt="" /></div>
      </div>
    </>
  );
}

export default Products;