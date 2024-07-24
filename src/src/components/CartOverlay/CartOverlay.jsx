import React, { Component } from "react";
import "./CartOverlay.style.scss";

import { DataContext } from "../../DataContext";
import CartListItem from "../CartListItem/CartListItem";
import request from "graphql-request";
import { PLACE_ORDER } from "../../constants/queries";
import Button from "../Button/Button";

class CartOverlay extends Component {
  async placeOrder(cartData, emptyCart) {
    const orderItems = cartData.products.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity,
        selectedAttributes: {
          ...product.selectedAttributes,
        },
      };
    });

    const variables = {
      input: {
        total: cartData.cartTotal,
        orderItems: orderItems,
      },
    };

    try {
      await request(process.env.REACT_APP_BASE_URL, PLACE_ORDER, variables).then(() => emptyCart());
    } catch (error) {
      console.log(error);
    }
  }

  renderItemsCount(itemsCount) {
    if (itemsCount === 0) {
      return null;
    }

    if (itemsCount > 1) {
      return `My Bag, ${itemsCount} items`;
    }

    return `My Bag, ${itemsCount} item`;
  }

  render() {
    return (
      <DataContext.Consumer>
        {({
          cartData,
          cartData: { itemsCount, products, cartTotal },
          storeCurrency: { currencySymbol },
          emptyCart,
        }) => (
          <div className="CartOverlay">
            <span>{this.renderItemsCount(itemsCount)}</span>
            <div className="CartOverlay-CartList">
              {products?.map((product) => (
                <CartListItem key={product.id} product={product} />
              ))}
            </div>
            <div className="CartOverlay-Total">
              <span>Total:</span>
              <span>
                {currencySymbol}
                {cartTotal}
              </span>
            </div>
            <Button
              className={`CartOverlay-PlaceOrder ${products.length < 1 ? "disabled" : ""}`}
              title={"Place Order"}
              onClick={() => this.placeOrder(cartData, emptyCart)}
              disabled={products.length < 1}
            />
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default CartOverlay;
