import React, { Component, createContext } from "react";

export const DataContext = createContext();

export class DataProvider extends Component {
  constructor() {
    super();
    this.state = {
      cartData: JSON.parse(localStorage.getItem("cartData")) || {
        products: [],
        itemsCount: 0,
        cartTotal: 0,
      },
      isCartOverlayVisible: false,
      selectedCategory: JSON.parse(localStorage.getItem("selectedCategory")) || {},
      storeCurrency: {
        currencyLabel: "USD",
        currencySymbol: "$",
      },
    };

    this.updateCartOverlayVisibilty = this.updateCartOverlayVisibilty.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.updateProductQuantity = this.updateProductQuantity.bind(this);
    this.updateSelectedCategory = this.updateSelectedCategory.bind(this);
    this.emptyCart = this.emptyCart.bind(this);
  }

  updateLocalCart(newCart) {
    localStorage.setItem("cartData", JSON.stringify(newCart));
  }

  updateSelectedCategory(category) {
    this.setState({ selectedCategory: category });
    localStorage.setItem("selectedCategory", JSON.stringify(category));
  }

  updateCartOverlayVisibilty() {
    this.setState({ isCartOverlayVisible: true });
  }

  getProductPrice(prices) {
    const {
      storeCurrency: { currencyLabel },
    } = this.state;

    const price = prices.filter((price) => price.currency.label === currencyLabel);

    return price[0];
  }

  updateCartTotal(products) {
    const cartTotal = products.reduce((acc, product) => {
      const productPrice = this.getProductPrice(product.prices);

      return acc + productPrice.amount * product.quantity;
    }, 0);

    return cartTotal.toFixed(2);
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

        const newProducts = [...products, { ...newProduct }];

        if (index === -1) {
          const newCartData = {
            ...prevState.cartData,
            products: newProducts,
            itemsCount: itemsCount + 1,
            cartTotal: this.updateCartTotal(newProducts),
          };

          this.updateLocalCart(newCartData);

          return {
            cartData: newCartData,
          };
        }

        const updatedProducts = [...products];

        updatedProducts[index] = {
          ...updatedProducts[index],
          quantity: updatedProducts[index].quantity + 1,
        };

        const newCartData = {
          ...prevState.cartData,
          products: updatedProducts,
          itemsCount: itemsCount + 1,
          cartTotal: this.updateCartTotal(updatedProducts),
        };

        this.updateLocalCart(newCartData);

        return {
          cartData: newCartData,
        };
      },
      () => {
        this.updateCartOverlayVisibilty();
        window.scrollTo(0, 0);
      }
    );
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

        const newCartData = {
          ...cartData,
          products: productsCopy,
          itemsCount: newItemsCount,
          cartTotal: this.updateCartTotal(productsCopy),
        };

        this.updateLocalCart(newCartData);
        return {
          cartData: newCartData,
        };
      }

      const updatedProducts = [...products];

      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: updatedProducts[index].quantity + quantityChange,
      };

      const newCartData = {
        ...prevState.cartData,
        products: updatedProducts,
        itemsCount: newItemsCount,
        cartTotal: this.updateCartTotal(updatedProducts),
      };

      this.updateLocalCart(newCartData);

      return {
        cartData: newCartData,
      };
    });
  }

  emptyCart() {
    const newCartData = {
      products: [],
      itemsCount: 0,
      cartTotal: 0,
    };

    this.updateLocalCart(newCartData);

    this.setState({
      cartData: newCartData,
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
          emptyCart: this.emptyCart,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
