import React, { Component } from "react";
import ProductImage from "../ProductListItem/image.png";
import "./ProductDetails.style.scss";
import ChevronIcon from "../ChevronIcon/ChevronIcon";

class ProductDetails extends Component {
  render() {
    return (
      <div className="ProductDetails">
        <div className="ProductDetails-Images">
          <div className="ProductDetails-ImagesList">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx}>
                <img className="ProductDetails-ImagesBoxes" src={ProductImage} alt="product slide" />
              </div>
            ))}
          </div>
          <div className="ProductDetails-ImagesSlider">
            <div className="ProductDetails-ImagesSliderChevron">
              <ChevronIcon className="ProductDetails-ImagesSliderChevron-Right" />
            </div>
            <img className="ProductDetails-ImagesMain" src={ProductImage} alt="current slid" />
            <div className="ProductDetails-ImagesSliderChevron ProductDetails-ImagesSliderChevron-Right">
              <ChevronIcon rotate={180} className="ProductDetails-ImagesSliderChevron-Left" />
            </div>
          </div>
        </div>
        <div className="ProductDetails-Info">
          <div className="ProductDetails-Title">
            <h1>Running Shorts</h1>
          </div>
          <div className="ProductDetails-Attributes">
            <div className="ProductDetails-AttributeSet">
              <h2 className="ProductDetails-SubTitle">Size:</h2>
              <div className="ProductDetails-AttributeOptions">
                <div className="ProductDetails-AttributeOptions-Text">XS</div>
                <div className="ProductDetails-AttributeOptions-Text selected">S</div>
                <div className="ProductDetails-AttributeOptions-Text">M</div>
                <div className="ProductDetails-AttributeOptions-Text">L</div>
              </div>
            </div>
            <div className="ProductDetails-AttributeSet">
              <h2 className="ProductDetails-SubTitle">Color:</h2>
              <div className="ProductDetails-AttributeOptions">
                <div className="ProductDetails-AttributeOptions-Color selected" style={{ backgroundColor: "#D3D2D5" }}>
                  XS
                </div>
                <div className="ProductDetails-AttributeOptions-Color" style={{ backgroundColor: "#2B2B2B" }}>
                  S
                </div>
                <div className="ProductDetails-AttributeOptions-Color" style={{ backgroundColor: "#0F6450" }}>
                  M
                </div>
              </div>
            </div>
          </div>
          <div className="ProductDetails-Price">
            <h2 className="ProductDetails-SubTitle">Price:</h2>
            <span className="ProductDetails-PriceAmount">$50.00</span>
          </div>
          <button className="ProductDetails-AddToCartBtn">ADD TO CART</button>
          <div className="ProductDetails-Description">
            <p>
              Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses
              and party dresses from all your favorite brands.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
