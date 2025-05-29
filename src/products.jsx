import React, { useEffect, useRef, useState } from "react";
import salePNG from "../images/salePNG.png";
import arrow from "../images/arrow.png";
import { ChangeId } from "./CurrentProduct.jsx";
import { loadProducts } from "./ProductData";
import "./products.css";
import { useAppContext } from "./AppContext";


function Products() {
  const { searchQuery, selectedTag, isSwitchOn, ItemPerPage, sortOption } = useAppContext();
  const productNum = ItemPerPage;
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products2, setProducts] = useState([]);

  const productDivRef = useRef(null);

  const ItemClass = isSwitchOn ? "item-dark" : "item";
  const LeftArrClass = isSwitchOn ? "leftarr-dark" : "leftarr";
  const RightArrClass = isSwitchOn ? "rightarr-dark" : "rightarr";
  const imagedivclass = isSwitchOn ? "imagediv-dark" : "imagediv";
  const pageNumClass = isSwitchOn ? "pageNum-dark" : "pageNum";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const allProducts = await loadProducts();
      setProducts(allProducts);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const el = productDivRef.current;
    if (!el) return;
    if (el.className !== "products2" && el.className !== "products2-dark") {
      el.className = isSwitchOn ? "products-dark" : "products";
    }
  }, [isSwitchOn]);

  // Helper function to render star rating
 function renderStars(rating) {
  const roundedRating = Math.round(rating * 2) / 2; // round to nearest 0.5
  const fullStars = Math.floor(roundedRating);
  const halfStar = roundedRating - fullStars === 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {"★".repeat(fullStars)}
      {halfStar ? "½" : ""}
      {"☆".repeat(emptyStars)}
    </>
  );
}


  let filteredProducts = products2.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "" || p.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());
    return matchesSearch && matchesTag;
  });

  // Add sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "On Sale":
        return b.discountPercentage - a.discountPercentage;
      case "From Cheapest":
        return a.price - b.price;
      case "From Most Expensive":
        return b.price - a.price;
      case "Highest Rated":
        return b.rating - a.rating;
      default:
        return 0; // "All" or unknown option = no sorting
    }
  });

  const visibleProducts = filteredProducts.slice(
    page * productNum,
    (page + 1) * productNum
  );

  useEffect(() => {
    if (page > 0 && page * productNum >= filteredProducts.length) {
      setPage(0);
    }
  }, [filteredProducts, page]);

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

  function handleLeftClick() {
    if (!loading && page > 0) setPage(page - 1);
    scrollToTop(200);
  }

  function handleRightClick() {
    if (!loading && (page + 1) * productNum < filteredProducts.length) {
      setPage(page + 1);
      scrollToTop(200);
    }
  }

  const arrowStyle = (disabled) => ({
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.3 : 1,
    userSelect: "none",
  });

  return (
    <div ref={productDivRef} id="ProductDiv">
      <div className="mainDiv">
        {visibleProducts.length === 0 && !loading ? (
          <p style={{ padding: "2rem", textAlign: "center", fontSize: "30px", color: "white", textShadow: "1px 1px black,-1px 1px black,-1px -1px black,1px -1px black" }}>
            No products found.
          </p>
        ) : (
          visibleProducts.map((product) => {
            const titleShort =
              product.title.length > 30
                ? product.title.slice(0, 30) + "..."
                : product.title;
            const hasDiscount = product.discountPercentage >= 10;

            return (
              <div
                key={product.id}
                id={`product-${product.id}`}
                className={ItemClass}
                onClick={() => {
                  const productsDiv = productDivRef.current;
                  const CurProductDiv = document.getElementById("CurProductDiv");
                  if (productsDiv)
                    productsDiv.className = isSwitchOn
                      ? "products2-dark"
                      : "products2";
                  if (CurProductDiv) {
                    CurProductDiv.className = isSwitchOn
                      ? "CurProductOpen-dark"
                      : "CurProductOpen";
                  }
                  ChangeId(product.id);
                  scrollToTop(250);
                }}
              >
                <div className={imagedivclass}>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="image"
                  />
                </div>
                <div className="textdiv">
                  <p className="text">{titleShort}</p>
                  <p className="discount">
                    {hasDiscount ? `${Math.ceil(product.discountPercentage)}%` : ""}
                  </p>
                  {hasDiscount && (
                    <img className="discountImg" src={salePNG} alt="Sale" />
                  )}
                  <p className="price">{product.price}$</p>
                  <p className="rating" title={`${product.rating} out of 5 stars`}>
                    {renderStars(product.rating)} ({product.rating.toFixed(1)})
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="pages">
        <div
          className={LeftArrClass}
          onClick={handleLeftClick}
          style={arrowStyle(loading || page === 0)}
          title={loading || page === 0 ? "Cannot go back" : "Previous page"}
        >
          <img src={arrow} alt="Left" style={{ transform: "rotate(180deg)" }} />
        </div>
        <div className={pageNumClass}>{page + 1}</div>
        <div
          className={RightArrClass}
          onClick={handleRightClick}
          style={arrowStyle(
            loading || (page + 1) * productNum >= filteredProducts.length
          )}
          title={
            loading || (page + 1) * productNum >= filteredProducts.length
              ? "No more pages"
              : "Next page"
          }
        >
          <img src={arrow} alt="Right" />
        </div>
      </div>
    </div>
  );
}

export default Products;
