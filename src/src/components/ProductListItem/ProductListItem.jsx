import React, { Component } from "react";
import cartImage from "./empty-cart.png";
import "./ProductListItem.style.scss";
import { DataContext } from "../../DataContext";
import { toKebabCase } from "../../utils/toKebabCase";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Price from "../Price/Price";

class ProductListItem extends Component {
  quickShop(e, product, addToCart) {
    e.preventDefault();

    const selectedAttributes = {};

    product.attributes.map((attribute) => {
      selectedAttributes[attribute.id] = {
        id: attribute.id,
        itemId: attribute.items[0].id,
      };

      return attribute;
    });

    addToCart({
      ...product,
      quantity: 1,
      selectedAttributes: selectedAttributes,
    });
  }

  renderQuickShop(inStock, addProductToCart) {
    if (!inStock) {
      return null;
    }

    const { product } = this.props;

    return (
      <button className="ProductListItem-AddToCartButton" onClick={(e) => this.quickShop(e, product, addProductToCart)}>
        <img src={cartImage} alt="add to cart" width={24} height={24} />
      </button>
    );
  }

  renderOutOfStock(inStock) {
    if (inStock) {
      return null;
    }

    return (
      <>
        <div className="ProductListItem-Overlay-Active" />
        <span className="ProductListItem-OverlayText active">OUT OF STOCK</span>
      </>
    );
  }

  render() {
    const {
      product: { id, inStock, gallery, name, prices },
    } = this.props;

    return (
      <DataContext.Consumer>
        {({ addProductToCart, storeCurrency: { currencyLabel } }) => (
          <Link
            to={`/products/${id}`}
            className={`ProductListItem${!inStock ? " out-of-stock" : ""}`}
            data-testid={`product-${toKebabCase(name)}`}
          >
            <div className="ProductListItem-ImageContainer">
              {this.renderOutOfStock(inStock)}
              <div style={{ backgroundImage: `url(${gallery[0]})` }} alt="product" className="ProductListItem-Image" />
            </div>
            {this.renderQuickShop(inStock, addProductToCart)}
            <div className="ProductListItem-Details">
              <h3 className="ProductListItem-Details-Title">{name}</h3>
              <span className={`ProductListItem-Details-Price`}>
                <Price prices={prices} currencyLabel={currencyLabel} />
              </span>
            </div>
          </Link>
        )}
      </DataContext.Consumer>
    );
  }
}

export default ProductListItem;
