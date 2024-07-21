import React, { Component } from "react";
import "./CartOverlay.style.scss";
import PlusIcon from "../PlusIcon/PlusIcon";

import { DataContext } from "../../DataContext";
import Price from "../Price/Price";
import { capitalizeString } from "../../utils/capitalizeString";

class CartOverlay extends Component {
  render() {
    return (
      <DataContext.Consumer>
        {({ cartData: { itemsCount, products }, updateProductQuantity, storeLabel }) => (
          <div className="CartOverlay">
            <span>{itemsCount ? `My Bag, ${itemsCount} items` : ""}</span>
            <div className="CartOverlay-ProductList">
              {products?.map(({ id, name, prices, attributes, selectedAttributes, quantity, gallery }) => (
                <div className="CartOverlay-ProductListItem" key={id}>
                  <div className="CartOverlay-ProductInfo">
                    <div className="CartOverlay-ProductDetails">
                      <h4 className="CartOverlay-ProductTitle">{name}</h4>
                      <Price storeLabel={storeLabel} prices={prices} />
                      <div className="CartOverlay-ProductAttributes">
                        {attributes?.map(({ id, name, items, type }) => (
                          <div className="CartOverlay-ProductAttributeSet" key={id}>
                            <h2 className="CartOverlay-ProductSubTitle">{name}:</h2>
                            <div className="CartOverlay-ProductAttributeOptions">
                              {items.map((item) => (
                                <div
                                  key={item.id}
                                  className={`CartOverlay-ProductAttributeOptions-${capitalizeString(type)} ${
                                    selectedAttributes[id]?.itemId === item.id ? "selected" : ""
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
                        onClick={() => updateProductQuantity({ id, selectedAttributes }, 1)}
                      >
                        <PlusIcon />
                      </div>
                      <div className="CartOverlay-CountNumber">
                        <span>{quantity}</span>
                      </div>
                      <div
                        className="CartOverlay-CountControl"
                        onClick={() => updateProductQuantity({ id, selectedAttributes }, -1)}
                      >
                        <PlusIcon />
                      </div>
                    </div>
                  </div>
                  <div className="CartOverlay-ProductImage">
                    <div style={{ backgroundImage: `url(${gallery[0]})` }} />
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
