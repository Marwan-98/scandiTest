import React, { Component } from "react";
import "./ProductDetails.style.scss";
import Gallery from "../Gallery/Gallery";
import request from "graphql-request";
import { PRODUCT_DETAILS } from "../../constants/queries";
import WithRouter from "../../WithRouter";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }

  async componentDidMount() {
    try {
      await request("http://localhost:8000/", PRODUCT_DETAILS(this.props.router.params.productId)).then((data) =>
        this.setState({ product: data.product }, () => console.log(this.state.product))
      );
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="ProductDetails">
        <Gallery gallery={this.state.product?.gallery} />
        <div>
          <div className="ProductDetails-Title">
            <h1>{this.state.product.name}</h1>
          </div>
          <div>
            {this.state.product.attributes?.map((attribute) => (
              <div key={attribute.id}>
                <h2 className="ProductDetails-SubTitle">{attribute.name}:</h2>
                <div className="ProductDetails-AttributeOptions">
                  {attribute.items.map((item) => (
                    <div
                      key={item.id}
                      className={`ProductDetails-AttributeOptions-${
                        attribute.type[0].toUpperCase() + attribute.type.slice(1)
                      }`}
                      style={{ backgroundColor: item.value }}
                    >
                      {item.displayValue}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="ProductDetails-Price">
            <h2 className="ProductDetails-SubTitle">Price:</h2>
            <span>
              {this.state.product.prices?.currency.symbol} {this.state.product.prices?.amount}
            </span>
          </div>
          <button className="ProductDetails-AddToCartBtn">ADD TO CART</button>
          <div className="ProductDetails-Description">
            <p>{this.state.product?.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default WithRouter(ProductDetails);
