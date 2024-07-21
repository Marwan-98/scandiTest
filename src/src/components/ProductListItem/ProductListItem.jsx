import React, { Component } from "react";
import cartImage from "./empty-cart.png";
import "./ProductListItem.style.scss";
import { Link } from "react-router-dom";
import { DataContext } from "../../DataContext";

class ProductListItem extends Component {
  quickShop(e, product, addToCart) {
    e.preventDefault();

    const selectedAttributes = {};

    product.attributes.map((attribute) => {
      selectedAttributes[attribute.id] = {
        id: attribute.id,
        itemId: attribute.items[0].id,
        productId: product.id,
      };

      return attribute;
    });

    console.log(selectedAttributes);

    addToCart({
      ...product,
      quantity: 1,
      selectedAttributes: selectedAttributes,
    });
  }

  render() {
    return (
      <DataContext.Consumer>
        {(context) => (
          <Link to={`/products/${this.props.product.id}`} className="ProductListItem">
            <div
              style={{ backgroundImage: `url(${this.props.product.gallery[0]})` }}
              alt="product"
              className="ProductListItem-Image"
            />
            <button
              className="ProductListItem-AddToCartButton"
              onClick={(e) => this.quickShop(e, this.props.product, context.addProductToCart)}
            >
              <img src={cartImage} alt="add to cart" width={24} height={24} />
            </button>
            <div className="ProductListItem-Details">
              <h3 className="ProductListItem-Details-Title">{this.props.product.name}</h3>
              <span className="ProductListItem-Details-Price">
                {this.props.product.prices[0].currency.symbol}
                {this.props.product.prices[0].amount}
              </span>
            </div>
          </Link>
        )}
      </DataContext.Consumer>
    );
  }
}

export default ProductListItem;
