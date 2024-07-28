import React, { Component } from "react";
import "./Price.style.scss";

export class Price extends Component {
  constructor() {
    super();
    this.state = {
      price: {},
    };
  }

  componentDidMount() {
    const { prices = [], currencyLabel } = this.props;

    prices.map((price) => {
      if (price.currency.label === currencyLabel) {
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
          <h2 className="Price-Title">Price:</h2>
          <h5 className="Price-Details">
            {symbol} {amount}
          </h5>
        </>
      );
    }

    return (
      <h5 className="Price-Details">
        {symbol} {amount}
      </h5>
    );
  }
}

export default Price;
