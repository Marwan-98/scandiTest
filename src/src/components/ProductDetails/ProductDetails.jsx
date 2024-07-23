import React, { Component } from "react";
import "./ProductDetails.style.scss";
import Gallery from "../Gallery/Gallery";
import request from "graphql-request";
import { PRODUCT_DETAILS } from "../../constants/queries";
import WithRouter from "../../WithRouter";
import { DataContext } from "../../DataContext";
import Price from "../Price/Price";
import Attribute from "../Attribute/Attribute";
import Button from "../Button/Button";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      selectedAttributes: {},
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
      const updatedAttributes = selectedAttributes;

      updatedAttributes[clickedAttribute.id] = clickedAttribute;

      return { selectedAttributes: updatedAttributes };
    });
  };

  renderAddToCart(selectedAttributes, addProductToCart) {
    const {
      product: { attributes, inStock },
    } = this.state;

    const isDisabled = Object.keys(selectedAttributes).length !== attributes?.length || !!!inStock;
    const title = inStock ? "ADD TO CART" : "OUT OF STOCK";

    return (
      <Button
        className={`ProductDetails-AddToCartBtn ${isDisabled ? "disabled" : ""}`}
        title={title}
        onClick={() =>
          addProductToCart({
            ...this.state.product,
            quantity: 1,
            selectedAttributes,
          })
        }
        disabled={isDisabled}
      />
    );
  }

  render() {
    const {
      loading,
      product: { name, gallery, attributes, prices, description } = {},
      selectedAttributes = {},
    } = this.state;

    if (loading) {
      return null;
    }

    return (
      <DataContext.Consumer>
        {({ addProductToCart, storeCurrency }) => (
          <div className="ProductDetails">
            <Gallery gallery={gallery} />
            <div>
              <div className="ProductDetails-Title">
                <h1>{name}</h1>
              </div>
              <div>
                {attributes?.map((attribute) => (
                  <Attribute
                    key={attribute.id}
                    attribute={attribute}
                    selectedAttributes={selectedAttributes}
                    updateSelectedAttributes={this.updateSelectedAttributes}
                  />
                ))}
              </div>
              <div className="ProductDetails-Price">
                <Price prices={prices} currencyLabel={storeCurrency.currencyLabel} renderTitle />
              </div>
              {this.renderAddToCart(selectedAttributes, addProductToCart)}
              <div className="ProductDetails-Description">
                <p>{description}</p>
              </div>
            </div>
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default WithRouter(ProductDetails);
