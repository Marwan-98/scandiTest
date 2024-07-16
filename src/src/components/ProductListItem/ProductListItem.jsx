import React, { Component } from "react";
import productImage from "./image.png";
import cartImage from "./empty-cart.png";
import "./ProductListItem.style.scss";
import { Link } from "react-router-dom";

class ProductListItem extends Component {
  render() {
    return (
      <Link to={`/products/${this.props.product.id}`} className="ProductListItem">
        <img src={productImage} alt="product" width={354} height={330} />
        <button className="ProductListItem-AddToCartButton">
          <img src={cartImage} alt="add to cart" width={24} height={24} />
        </button>
        <div className="ProductListItem-Details">
          <h3 className="ProductListItem-Details-Title">{this.props.product.name}</h3>
          <span className="ProductListItem-Details-Price">
            {this.props.product.prices.currency.symbol}
            {this.props.product.prices.amount}
          </span>
        </div>
      </Link>
    );
  }
}

export default ProductListItem;
