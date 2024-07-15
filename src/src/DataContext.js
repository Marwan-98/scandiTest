import React, { Component, createContext } from "react";

export const DataContext = createContext();

export class DataProvider extends Component {
  constructor() {
    super();
    this.state = {
      cartData: {
        itemsCount: 2,
      },
    };
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          cartData: this.state.cartData,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

// export const useDataContext = () => useContext(DataContext);
