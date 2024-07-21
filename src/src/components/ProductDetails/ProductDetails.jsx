import React, { Component } from "react";
import "./ProductDetails.style.scss";
import Gallery from "../Gallery/Gallery";
import request from "graphql-request";
import { PRODUCT_DETAILS } from "../../constants/queries";
import WithRouter from "../../WithRouter";
import { DataContext } from "../../DataContext";
import { capitalizeString } from "../../utils/capitalizeString";
import Price from "../Price/Price";

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

  render() {
    const { loading, product: { id, name, gallery, attributes, prices } = {}, selectedAttributes = {} } = this.state;

    if (loading) {
      return null;
    }

    return (
      <DataContext.Consumer>
        {(context) => (
          <div className="ProductDetails">
            <Gallery gallery={gallery} />
            <div>
              <div className="ProductDetails-Title">
                <h1>{name}</h1>
              </div>
              <div>
                {attributes?.map(({ id, name, items, type }) => (
                  <div key={id}>
                    <h2 className="ProductDetails-SubTitle">{name}:</h2>
                    <div className="ProductDetails-AttributeOptions">
                      {items.map(({ id: itemId, value, displayValue }) => (
                        <div
                          key={itemId}
                          className={`ProductDetails-AttributeOptions-${capitalizeString(type)}
                          ${selectedAttributes[id]?.itemId === itemId ? "selected" : ""}`}
                          style={{ backgroundColor: value }}
                          onClick={() =>
                            this.updateSelectedAttributes({
                              id,
                              itemId,
                              productId: id,
                            })
                          }
                        >
                          {displayValue}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="ProductDetails-Price">
                <Price prices={prices} storeLabel={context.storeLabel} renderTitle />
              </div>
              <button
                className="ProductDetails-AddToCartBtn"
                onClick={() =>
                  context.addProductToCart({
                    ...this.state.product,
                    quantity: 1,
                    selectedAttributes: selectedAttributes,
                  })
                }
                disabled={Object.keys(selectedAttributes).length !== attributes?.length}
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
