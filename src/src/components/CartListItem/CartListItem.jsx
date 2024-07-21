import React, { Component } from "react";
import Price from "../Price/Price";
import { DataContext } from "../../DataContext";
import Attribute from "../Attribute/Attribute";
import QuantityControl from "../QuantityControl/QuantityControl";

export class CartListItem extends Component {
  render() {
    const { id: productId, name, prices, attributes, selectedAttributes, quantity, gallery } = this.props.product;

    return (
      <DataContext.Consumer>
        {({ storeCurrency: { currencyLabel } }) => (
          <div className="CartOverlay-CartListItem" key={productId}>
            <div className="CartOverlay-ProductInfo">
              <div className="CartOverlay-ProductDetails">
                <h4 className="CartOverlay-ProductTitle">{name}</h4>
                <Price currencyLabel={currencyLabel} prices={prices} />
                <div className="CartOverlay-ProductAttributes">
                  {attributes?.map((attribute) => (
                    <Attribute
                      key={attribute.id}
                      attribute={attribute}
                      selectedAttributes={selectedAttributes}
                      updateSelectedAttributes={this.updateSelectedAttributes}
                      productId={productId}
                      size="cart"
                    />
                  ))}
                </div>
              </div>
              <QuantityControl
                productId={productId}
                productQuantity={quantity}
                selectedAttributes={selectedAttributes}
              />
            </div>
            <div className="CartOverlay-ProductImage">
              <div style={{ backgroundImage: `url(${gallery[0]})` }} />
            </div>
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default CartListItem;
