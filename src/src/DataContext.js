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
    this.updateProductQuantity = this.updateProductQuantity.bind(this);
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

  updateProductQuantity(targetProduct, quantityChange) {
    this.setState((prevState) => {
      const {
        cartData: { products, itemsCount },
      } = prevState;

      const newItemsCount = itemsCount + quantityChange;

      const index = products.findIndex(
        (product) =>
          JSON.stringify(product.selectedAttributes) === JSON.stringify(targetProduct.selectedAttributes) &&
          product.id === targetProduct.id
      );

      if (products[index].quantity + quantityChange === 0) {
        const productsCopy = [...products];

        productsCopy.splice(index, 1);

        return {
          cartData: { ...prevState.cartData, products: productsCopy, itemsCount: newItemsCount },
        };
      }

      const updatedProducts = [...products];

      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: updatedProducts[index].quantity + quantityChange,
      };

      return {
        cartData: { ...prevState.cartData, products: updatedProducts, itemsCount: newItemsCount },
      };
    });
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          cartData: this.state.cartData,
          isCartOverlayVisible: this.state.isCartOverlayVisible,
          updateCartOverlayVisibilty: this.updateCartOverlayVisibilty,
          addProductToCart: this.addProductToCart,
          updateProductQuantity: this.updateProductQuantity,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

// export const useDataContext = () => useContext(DataContext);
