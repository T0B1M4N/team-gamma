import React, { useState, useEffect } from "react";
import placeHolder from "../images/placeholder-image.png";
import { getProductById } from "./ProductData"; // your function to get product by id
import "./CurrentProduct.css";
import cart from "../images/cart-shopping-solid.svg";
import box from "../images/box-open-solid.svg"
import { useAppContext } from "./AppContext";

let externalSetProduct = null;

function renderStars(rating) {
  const roundedRating = Math.round(rating); // round to nearest whole star
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else {
      stars.push(<span key={i} className="star empty">☆</span>);
    }
  }

  return stars;
}

function CurProd() {
  const [product, setProduct] = useState(null);
  const { isSwitchOn } = useAppContext();
  const MainCStyle = isSwitchOn ? "mainCurDiv-dark" : "mainCurDiv";
  const stockstyle = isSwitchOn ? "Stock-dark" : "Stock"
  useEffect(() => {
    externalSetProduct = setProduct;
    return () => {
      externalSetProduct = null;
    };
  }, []);

  if (!product) {
    return (
      <div className="CurProductClosed" id="CurProductDiv">
        <div className="paddingDiv">
            <p style={{color: "red", fontSize: "100px"}}>No product selected</p>
        </div>
      </div>
    );
  }

  const {
    images,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    category,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    meta,
  } = product;

  return (
    <div className="CurProductOpen" id="CurProductDiv">
    <div className="paddingDiv">
        <div className={MainCStyle}>
      <div className="imgTitleDesc">
        <div className="productIcon">
          <img src={images?.[0] || placeHolder} alt={title} />
        </div>
        <div className="TitleDesc">
          <h1>{title}</h1>
          <p className="Desc">{description}</p>
          <p>
            {renderStars(rating)} <span className="ratingNumber">{rating.toFixed(2)}</span> / 5
          </p>
          <p className={stockstyle}><img src={box} className="IconBox" alt="" /> In Stock: {stock}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Tags:</strong> {tags.join(", ")}</p>
          {brand && <p><strong>Brand:</strong> {brand}</p>}
          <p><strong>SKU:</strong> {sku}</p>
          <p><strong>Weight:</strong> {weight}g</p>
          <p><strong>Dimensions (W x H x D):</strong> {dimensions.width} x {dimensions.height} x {dimensions.depth} mm</p>
          <p><strong>Warranty:</strong> {warrantyInformation}</p>
          <p><strong>Shipping:</strong> {shippingInformation}</p>
          <p><strong>Availability:</strong> {availabilityStatus}</p>
          <p><strong>Return Policy:</strong> {returnPolicy}</p>
          <p><strong>Minimum Order Quantity:</strong> {minimumOrderQuantity}</p>
          {discountPercentage >= 10 ? (
            <div className="priceDiscountContainer">
                <p className="discountText"><strong>Discount:</strong> {Math.ceil(discountPercentage)}%</p>
                <p className="CurPriceDis">${price.toFixed(2)},-</p>
            </div>
            ) : (
             <p className="CurPrice">${price.toFixed(2)},-</p>
            )}
            <div className="AddToCart">
                <img className="Icon" src={cart} alt=""/>
                Add to Cart
            </div>
        </div>
      </div>
      <div className="reviews">
      <h2>Reviews:</h2>
          {reviews && reviews.length > 0 ? (
            <ul className="reviewsList">
              {reviews.map((review, idx) => (
                <li key={idx}>
                  <strong>{review.reviewerName}</strong> ({new Date(review.date).toLocaleDateString()}):<br />
                  Rating: {review.rating} / 5<br />
                  <em>{review.comment}</em>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
          <h3>Meta Information:</h3>
          <p><strong>Created At:</strong> {new Date(meta.createdAt).toLocaleDateString()} <strong>/ Updated At:</strong> {new Date(meta.updatedAt).toLocaleDateString()}</p>
          <p><strong>Barcode:</strong> {meta.barcode}</p>
          {meta.qrCode && (
            <p>
              <strong>QR Code:</strong><br />
              <img src={meta.qrCode} alt="QR Code" style={{ maxWidth: "150px" }} />
            </p>
          )}
          </div>
    </div>
    </div>
  );
}

export default CurProd;

export function ChangeId(newID) {
  const product = getProductById(newID);

  if (externalSetProduct) externalSetProduct(product);
}