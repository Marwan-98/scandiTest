import React, { Component, createContext } from "react";

export const DataContext = createContext();

export class DataProvider extends Component {
  constructor() {
    super();
    this.state = {
      cartData: {
        products: [],
        itemsCount: 0,
        cartTotal: 0,
      },
      isCartOverlayVisible: false,
      selectedCategory: {},
      storeCurrency: {
        currencyLabel: "USD",
        currencySymbol: "$",
      },
    };

    this.updateCartOverlayVisibilty = this.updateCartOverlayVisibilty.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.updateProductQuantity = this.updateProductQuantity.bind(this);
    this.updateSelectedCategory = this.updateSelectedCategory.bind(this);
  }

  updateSelectedCategory(category) {
    this.setState({ selectedCategory: category });
  }

  updateCartOverlayVisibilty() {
    this.setState({ isCartOverlayVisible: !this.state.isCartOverlayVisible });
  }

  getProductPrice(prices) {
    const {
      storeCurrency: { currencyLabel },
    } = this.state;

    const price = prices.filter((price) => price.currency.label === currencyLabel);

    return price;
  }

  updateCartTotal(products) {
    const cartTotal = products.reduce((acc, product) => {
      this.getProductPrice(product.prices);

      return acc + product.prices[0].amount * product.quantity;
    }, 0);

    return cartTotal.toFixed(2);
  }

  addProductToCart(newProduct) {
    this.setState((prevState) => {
      const {
        cartData: { products, itemsCount },
      } = prevState;

      const index = products.findIndex(
        (product) =>
          JSON.stringify(product.selectedAttributes) === JSON.stringify(newProduct.selectedAttributes) &&
          product.id === newProduct.id
      );

      const newProducts = [...products, { ...newProduct }];

      if (index === -1) {
        return {
          cartData: {
            ...prevState.cartData,
            products: newProducts,
            itemsCount: itemsCount + 1,
            cartTotal: this.updateCartTotal(newProducts),
          },
        };
      }

      const updatedProducts = [...products];

      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: updatedProducts[index].quantity + 1,
      };

      return {
        cartData: {
          ...prevState.cartData,
          products: updatedProducts,
          itemsCount: itemsCount + 1,
          cartTotal: this.updateCartTotal(updatedProducts),
        },
      };
    });
  }

  updateProductQuantity(targetProduct, quantityChange) {
    this.setState((prevState) => {
      const {
        cartData,
        cartData: { products, itemsCount },
      } = prevState;

      const { id, selectedAttributes } = targetProduct;

      const newItemsCount = itemsCount + quantityChange;

      const index = products.findIndex(
        ({ selectedAttributes: cartProductSelectedAttributes, id: productId }) =>
          JSON.stringify(cartProductSelectedAttributes) === JSON.stringify(selectedAttributes) && productId === id
      );

      if (products[index].quantity + quantityChange === 0) {
        const productsCopy = [...products];

        productsCopy.splice(index, 1);

        return {
          cartData: {
            ...cartData,
            products: productsCopy,
            itemsCount: newItemsCount,
            cartTotal: this.updateCartTotal(productsCopy),
          },
        };
      }

      const updatedProducts = [...products];

      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: updatedProducts[index].quantity + quantityChange,
      };

      return {
        cartData: {
          ...prevState.cartData,
          products: updatedProducts,
          itemsCount: newItemsCount,
          cartTotal: this.updateCartTotal(updatedProducts),
        },
      };
    });
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          cartData: this.state.cartData,
          isCartOverlayVisible: this.state.isCartOverlayVisible,
          selectedCategory: this.state.selectedCategory,
          storeCurrency: this.state.storeCurrency,
          updateCartOverlayVisibilty: this.updateCartOverlayVisibilty,
          addProductToCart: this.addProductToCart,
          updateProductQuantity: this.updateProductQuantity,
          updateSelectedCategory: this.updateSelectedCategory,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
