import React, { Component } from "react";
import "./ProductDetails.style.scss";
import Gallery from "../Gallery/Gallery";
import request from "graphql-request";
import { PRODUCT_DETAILS } from "../../constants/queries";
import { DataContext } from "../../DataContext";
import Price from "../Price/Price";
import Attribute from "../Attribute/Attribute";
import Button from "../Button/Button";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

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
      const { match: { params: { productId } } = {} } = this.props;

      const variables = {
        productId,
      };

      const productData = await request(process.env.REACT_APP_BASE_URL, PRODUCT_DETAILS, variables);

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

  renderAddToCart(addProductToCart) {
    const {
      product,
      product: { attributes, inStock },
      selectedAttributes = {},
    } = this.state;

    const isDisabled = Object.keys(selectedAttributes).length !== attributes?.length || !!!inStock;
    const title = inStock ? "ADD TO CART" : "OUT OF STOCK";

    return (
      <Button
        className={`ProductDetails-AddToCartBtn ${isDisabled ? "disabled" : ""}`}
        title={title}
        onClick={() =>
          addProductToCart({
            ...product,
            quantity: 1,
            selectedAttributes,
          })
        }
        disabled={isDisabled}
        data-testid="add-to-cart"
      />
    );
  }

  renderDescription() {
    const { product: { description } = {} } = this.state;

    const cleanHTML = DOMPurify.sanitize(description, { USE_PROFILES: { html: true } });
    const parsedHTML = parse(cleanHTML);

    return (
      <div className="ProductDetails-Description" data-testid="product-description">
        {parsedHTML}
      </div>
    );
  }

  render() {
    const { loading, product: { name, gallery, attributes, prices } = {}, selectedAttributes = {} } = this.state;

    if (loading) {
      return null;
    }

    return (
      <DataContext.Consumer>
        {({ addProductToCart, storeCurrency: { currencyLabel } }) => (
          <div className="ProductDetails">
            <Gallery gallery={gallery} />
            <div>
              <h1 className="ProductDetails-Title">{name}</h1>
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
                <Price prices={prices} currencyLabel={currencyLabel} renderTitle />
              </div>
              {this.renderAddToCart(addProductToCart)}
              {this.renderDescription()}
            </div>
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default withRouter(ProductDetails);
