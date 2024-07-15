import React, { Component, createContext } from "react";

export const DataContext = createContext();

export class DataProvider extends Component {
  constructor() {
    super();
    this.state = {
      cartData: {
        itemsCount: 2,
      },
      isCartOverlayVisible: false,
    };

    this.updateCartOverlayVisibilty = this.updateCartOverlayVisibilty.bind(this);
  }

  updateCartOverlayVisibilty() {
    this.setState({ isCartOverlayVisible: !this.state.isCartOverlayVisible });
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          cartData: this.state.cartData,
          isCartOverlayVisible: this.state.isCartOverlayVisible,
          updateCartOverlayVisibilty: this.updateCartOverlayVisibilty,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

// export const useDataContext = () => useContext(DataContext);
