import React, { Component } from "react";

export class Price extends Component {
  constructor() {
    super();
    this.state = {
      price: {},
    };
  }

  componentDidMount() {
    const { prices = [], storeLabel } = this.props;

    prices.map((price) => {
      if (price.currency.label === storeLabel) {
        this.setState({
          price,
        });
      }

      return price;
    });
  }

  render() {
    const {
      price: { currency: { symbol = "" } = {}, amount = 0 },
    } = this.state;

    const { renderTitle } = this.props;

    if (renderTitle) {
      return (
        <>
          <h2 className="ProductDetails-SubTitle">Price:</h2>
          <h5 className="CartOverlay-ProductPrice">
            {symbol}
            {amount}
          </h5>
        </>
      );
    }

    return (
      <h5 className="CartOverlay-ProductPrice">
        {symbol}
        {amount}
      </h5>
    );
  }
}

export default Price;
