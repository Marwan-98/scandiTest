import React, { Component } from "react";
import "./ProductDetails.style.scss";
import Gallery from "../Gallery/Gallery";
import request from "graphql-request";
import { PRODUCT_DETAILS } from "../../constants/queries";
import WithRouter from "../../WithRouter";
import { DataContext } from "../../DataContext";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      selectedAttributes: [],
      loading: false,
    };
  }

  async fetchData() {
    this.setState({ loading: true });
    try {
      const productData = await request("http://localhost:8000/", PRODUCT_DETAILS(this.props.router.params.productId));

      this.setState({ product: productData.product });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  updateSelectedAttributes = (clickedAttribute) => {
    this.setState((prevState) => {
      const { selectedAttributes } = prevState;
      const index = selectedAttributes.findIndex((attr) => attr.id === clickedAttribute.id);

      if (index === -1) {
        return { selectedAttributes: [...selectedAttributes, clickedAttribute] };
      } else {
        const newAttributes = [...selectedAttributes];
        newAttributes[index] = clickedAttribute;
        return { selectedAttributes: newAttributes };
      }
    });
  };

  render() {
    const { loading } = this.state;

    if (loading) {
      return null;
    }

    return (
      <DataContext.Consumer>
        {(context) => (
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
                          } ${
                            this.state.selectedAttributes.find(
                              (currAttribute) => currAttribute.itemId === item.id && currAttribute.id === attribute.id
                            ) && "selected"
                          }`}
                          style={{ backgroundColor: item.value }}
                          onClick={() =>
                            this.updateSelectedAttributes({
                              id: attribute.id,
                              itemId: item.id,
                              productId: this.state.product.id,
                            })
                          }
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
              <button
                className="ProductDetails-AddToCartBtn"
                onClick={() =>
                  context.addProductToCart({
                    ...this.state.product,
                    quantity: 1,
                    selectedAttributes: this.state.selectedAttributes,
                  })
                }
                disabled={this.state.selectedAttributes?.length !== this.state.product.attributes?.length}
              >
                ADD TO CART
              </button>
              <div className="ProductDetails-Description">
                <p>{this.state.product?.description}</p>
              </div>
            </div>
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default WithRouter(ProductDetails);
