import React, { Component } from "react";
import productImage from "./image.png";
import cartImage from "./empty-cart.png";
import "./ProductListItem.style.scss";

class ProductListItem extends Component {
  render() {
    return (
      <div className="ProductListItem">
        <img src={productImage} alt="product" width={354} height={330} />
        <button className="ProductListItem-AddToCartButton">
          <img src={cartImage} alt="add to cart" width={24} height={24} />
        </button>
        <div className="ProductListItem-Details">
          <h3 className="ProductListItem-Details-Title">Running Short</h3>
          <span className="ProductListItem-Details-Price">$50.00</span>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
