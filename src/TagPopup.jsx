import React from "react";
import "./TagPopup.css";
import { useAppContext } from "./AppContext";

function TagPopup({ tags, visible, onClose }) {
  const {
    selectedTag,
    setSelectedTag,
    isSwitchOn,
    sortOption,
    setSortOption,
  } = useAppContext();

  if (!visible) return null;

  const tagButtonClass = isSwitchOn ? "TagButton-dark" : "TagButton";
  const sortButtonClass = isSwitchOn ? "SortButton-dark" : "SortButton";
  const popupClass = isSwitchOn ? "TagPopup-dark" : "TagPopup";
  const closebtnClass = isSwitchOn ? "close-btn-dark" : "close-btn";

  const sortOptions = [
    "All",
    "On Sale",
    "From Cheapest",
    "From Most Expensive",
    "Highest Rated",
  ];

  return (
    <div className={popupClass}>
      <div className="popup-header">
        <h3>Filter by Category</h3>
        <button className={closebtnClass} onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="popup-sorting">
        <h4>Sort Products</h4>
        <div className="sort-buttons">
          {sortOptions.map((option) => (
            <button
              key={option}
              className={`${sortButtonClass} ${
                sortOption === option ? "selected" : ""
              }`}
              onClick={() => setSortOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="popup-tags">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`${tagButtonClass} ${
              selectedTag === tag ? "selected" : ""
            }`}
            onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TagPopup;
