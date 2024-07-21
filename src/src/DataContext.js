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
      selectedCategory: {},
      storeLabel: "USD",
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
          cartData: { ...cartData, products: productsCopy, itemsCount: newItemsCount },
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
          selectedCategory: this.state.selectedCategory,
          storeLabel: this.state.storeLabel,
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

// export const useDataContext = () => useContext(DataContext);
