import React, { Component } from "react";
import "./CartOverlay.style.scss";

import { DataContext } from "../../DataContext";
import CartListItem from "../CartListItem/CartListItem";
import request from "graphql-request";
import { PLACE_ORDER } from "../../constants/queries";

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
      await request("http://localhost:8000/", PLACE_ORDER, variables).then(() => emptyCart());
    } catch (error) {
      console.log(error);
    }
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
            <span>{itemsCount ? `My Bag, ${itemsCount} items` : ""}</span>
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
            <button className="CartOverlay-PlaceOrder" onClick={() => this.placeOrder(cartData, emptyCart)}>
              Place Order
            </button>
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default CartOverlay;
