import './SideBar.css';
import { useAppContext } from "./AppContext";
import { useEffect, useState } from "react";

function SideBar() {
  const { 
    isSwitchOn, 
    ItemPerPage, 
    SetItemsPerPage, 
    selectedTag, 
    setSelectedTag,
    sortOption,
    setSortOption
  } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sidebarclass = isSwitchOn ? "SideBar-dark" : "SideBar";
  const sidebarbuttonclass = isSwitchOn ? "Sidebutton-dark" : "Sidebutton";
  const sliderClass = isSwitchOn ? "PageSlider-dark" : "PageSlider";
  const tagButtonClass = isSwitchOn ? "TagButton-dark" : "TagButton";

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  // Filter products by selectedTag if any
  const filteredProducts = selectedTag
    ? products.filter(product => product.tags?.includes(selectedTag))
    : products;

  // Extract tags only from currently filtered products
  const filteredTags = [...new Set(filteredProducts.flatMap(product => product.tags || []))];

  return (
    <div className={sidebarclass}>
      <div className="main">
        <div className="top">
          {/* You can keep your static buttons or remove them if not needed */}
          <div className={sidebarbuttonclass}onClick={() => setSortOption("All")}>All</div>
          <div className="line"></div>
          <div className={sidebarbuttonclass}onClick={() => setSortOption("On Sale")}>On Sale</div>
          <div className="line"></div>
          <div className={sidebarbuttonclass} onClick={() => setSortOption("From Cheapest")}>From Cheapest</div>
          <div className="line"></div>
          <div className={sidebarbuttonclass}onClick={() => setSortOption("From Most Expensive")}>Most Expensive</div>
          <div className="line"></div>
          <div className={sidebarbuttonclass}onClick={() => setSortOption("Highest Rated")}>Highest Rated</div>
          <div className="line"></div>
        </div>

        <div className="bottom">
          <label style={{ display: "block", margin: "1rem 0", color: isSwitchOn ? "#fff" : "#000" }}>
            Items per page: {ItemPerPage}
          </label>
          <input
            type="range"
            min={10}
            max={100}
            step={10}
            value={ItemPerPage}
            className={sliderClass}
            onChange={(e) => SetItemsPerPage(Number(e.target.value))}
          />

            <label style={{ display: "block", margin: "1rem 0", color: isSwitchOn ? "#fff" : "#000" }}>
              Filter by Tags:
            </label>
            {loading ? (
              <p style={{ color: isSwitchOn ? "#aaa" : "#444" }}>Loading tags...</p>
            ) : filteredTags.length === 0 ? (
              <p style={{ color: isSwitchOn ? "#aaa" : "#444" }}>No tags available.</p>
            ) : (
              <div className="tag-container">
                {filteredTags.map((tag) => (
                  <button
                    key={tag}
                    className={`${tagButtonClass} ${selectedTag === tag ? "selected" : ""}`}
                    onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)} // toggle tag selection
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
