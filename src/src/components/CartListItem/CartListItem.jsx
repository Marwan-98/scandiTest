import React, { Component } from "react";
import Price from "../Price/Price";
import { DataContext } from "../../DataContext";
import Attribute from "../Attribute/Attribute";
import QuantityControl from "../QuantityControl/QuantityControl";
import "./CartListItem.style.scss";

export class CartListItem extends Component {
  render() {
    const { id: productId, name, prices, attributes, selectedAttributes, quantity, gallery } = this.props.product;

    return (
      <DataContext.Consumer>
        {({ storeCurrency: { currencyLabel } }) => (
          <div className="CartListItem">
            <div className="CartListItem-ProductInfo">
              <div className="CartListItem-ProductDetails">
                <h4 className="CartListItem-ProductTitle">{name}</h4>
                <Price currencyLabel={currencyLabel} prices={prices} />
                <div className="CartListItem-ProductAttributes">
                  {attributes?.map((attribute) => (
                    <Attribute
                      key={attribute.id}
                      attribute={attribute}
                      selectedAttributes={selectedAttributes}
                      productId={productId}
                      isInCartList
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
            <div className="CartListItem-ProductImage">
              <div style={{ backgroundImage: `url(${gallery[0]})` }} />
            </div>
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default CartListItem;
