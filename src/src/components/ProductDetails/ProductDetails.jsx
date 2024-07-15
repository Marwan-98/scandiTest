import React, { Component } from "react";
import "./ProductDetails.style.scss";
import Gallery from "../Gallery/Gallery";

class ProductDetails extends Component {
  render() {
    return (
      <div className="ProductDetails">
        <Gallery />
        <div>
          <div className="ProductDetails-Title">
            <h1>Running Shorts</h1>
          </div>
          <div>
            <div>
              <h2 className="ProductDetails-SubTitle">Size:</h2>
              <div className="ProductDetails-AttributeOptions">
                <div className="ProductDetails-AttributeOptions-Text">XS</div>
                <div className="ProductDetails-AttributeOptions-Text selected">S</div>
                <div className="ProductDetails-AttributeOptions-Text">M</div>
                <div className="ProductDetails-AttributeOptions-Text">L</div>
              </div>
            </div>
            <div>
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
            <span>$50.00</span>
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
