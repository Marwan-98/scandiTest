import React, { Component, createContext } from "react";

export const DataContext = createContext();

export class DataProvider extends Component {
  constructor() {
    super();
    this.state = {
      cartData: {
        products: [],
        itemsCount: 2,
      },
      isCartOverlayVisible: false,
    };

    this.updateCartOverlayVisibilty = this.updateCartOverlayVisibilty.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  updateCartOverlayVisibilty() {
    this.setState({ isCartOverlayVisible: !this.state.isCartOverlayVisible });
  }

  addProductToCart(newProduct) {
    this.setState(
      {
        cartData: { ...this.state.cartData, products: [...this.state.cartData.products, { ...newProduct }] },
      },
      () => console.log(this.state.cartData)
    );
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          cartData: this.state.cartData,
          isCartOverlayVisible: this.state.isCartOverlayVisible,
          updateCartOverlayVisibilty: this.updateCartOverlayVisibilty,
          addProductToCart: this.addProductToCart,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

// export const useDataContext = () => useContext(DataContext);
