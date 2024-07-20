import React, { Component } from "react";
import "./CartOverlay.style.scss";
import PlusIcon from "../PlusIcon/PlusIcon";
import productImage from "../ProductListItem/image.png";

import { DataContext } from "../../DataContext";

class CartOverlay extends Component {
  render() {
    return (
      <DataContext.Consumer>
        {(context) => (
          <div className="CartOverlay">
            <span>{context.cartData.itemsCount ? `My Bag, ${context.cartData.itemsCount} items` : ""}</span>
            <div className="CartOverlay-ProductList">
              {context.cartData.products?.map((product) => (
                <div className="CartOverlay-ProductListItem" key={product.id}>
                  <div className="CartOverlay-ProductInfo">
                    <div className="CartOverlay-ProductDetails">
                      <h4 className="CartOverlay-ProductTitle">{product.name}</h4>
                      <h5 className="CartOverlay-ProductPrice">
                        {product.prices[0].currency.symbol}
                        {product.prices[0].amount}
                      </h5>
                      <div className="CartOverlay-ProductAttributes">
                        {product.attributes?.map((attribute) => (
                          <div className="CartOverlay-ProductAttributeSet" key={attribute.id}>
                            <h2 className="CartOverlay-ProductSubTitle">{attribute.name}:</h2>
                            <div className="CartOverlay-ProductAttributeOptions">
                              {attribute.items.map((item) => (
                                <div
                                  key={item.id}
                                  className={`CartOverlay-ProductAttributeOptions-${
                                    attribute.type[0].toUpperCase() + attribute.type.slice(1)
                                  } ${
                                    product.selectedAttributes.find(
                                      (currAttribute) =>
                                        currAttribute.itemId === item.id && currAttribute.id === attribute.id
                                    ) && "selected"
                                  }`}
                                  style={{ backgroundColor: item.value }}
                                >
                                  {item.displayValue}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="CartOverlay-ProductCount">
                      <div
                        className="CartOverlay-CountControl"
                        onClick={() => context.updateProductQuantity(product, 1)}
                      >
                        <PlusIcon />
                      </div>
                      <div className="CartOverlay-CountNumber">
                        <span>{product.quantity}</span>
                      </div>
                      <div
                        className="CartOverlay-CountControl"
                        onClick={() => context.updateProductQuantity(product, -1)}
                      >
                        <PlusIcon />
                      </div>
                    </div>
                  </div>
                  <div className="CartOverlay-ProductImage">
                    <img src={productImage} alt="product" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default CartOverlay;
