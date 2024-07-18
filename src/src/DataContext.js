import React, { Component, createContext } from "react";

export const DataContext = createContext();

export class DataProvider extends Component {
  constructor() {
    super();
    this.state = {
      cartData: {
        products: [],
        itemsCount: 0,
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
      (prevState) => {
        const {
          cartData: { products, itemsCount },
        } = prevState;

        const index = products.findIndex(
          (product) =>
            JSON.stringify(product.selectedAttributes) === JSON.stringify(newProduct.selectedAttributes) &&
            product.id === newProduct.id
        );

        if (index === -1) {
          return {
            cartData: {
              ...prevState.cartData,
              products: [...products, { ...newProduct }],
              itemsCount: itemsCount + 1,
            },
          };
        }

        const updatedProducts = [...products];

        updatedProducts[index] = {
          ...updatedProducts[index],
          quantity: updatedProducts[index].quantity + 1,
        };

        return {
          cartData: { ...prevState.cartData, products: updatedProducts, itemsCount: itemsCount + 1 },
        };
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
