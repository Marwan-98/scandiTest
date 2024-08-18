import React, { Component } from "react";
import "./ProductList.style.scss";
import ProductListItem from "../ProductListItem/ProductListItem.jsx";
import { request } from "graphql-request";
import { PRODUCT_BY_CATEGORY } from "../../constants/queries.js";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min.js";

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: false,
    };
  }

  async fetchData() {
    this.setState({ loading: true });

    try {
      const { match: { params: { categoryName } } = {} } = this.props;

      const variables = {
        categoryName,
      };

      const productData = await request(process.env.REACT_APP_BASE_URL, PRODUCT_BY_CATEGORY, variables);

      this.setState({ products: productData.products });
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { match: { params: { categoryName } } = {} } = this.props;
    const { match: { params: { categoryName: prevCategoryName } } = {} } = prevProps;

    if (categoryName !== prevCategoryName) {
      this.fetchData();
    }
  }

  renderProductList() {
    const { loading, products } = this.state;

    if (loading) {
      return null;
    }

    return (
      <div className="ProductList-List">
        {products?.map((product, idx) => (
          <ProductListItem product={product} key={idx} />
        ))}
      </div>
    );
  }

  render() {
    const { selectedCategory: { name } = {}, match: { params: { categoryName } } = {} } = this.props;
    const { loading } = this.state;

    if (loading || name !== categoryName) {
      return null;
    }

    return (
      <div className="ProductList">
        <h2 className="ProductList-Heading">{name}</h2>
        {this.renderProductList()}
      </div>
    );
  }
}

export default withRouter(ProductList);
