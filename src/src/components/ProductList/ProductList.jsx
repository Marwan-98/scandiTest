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
      const {
        selectedCategory: { id: categoryId = "1" },
      } = this.props;

      const productData = await request(process.env.REACT_APP_BASE_URL, PRODUCT_BY_CATEGORY(categoryId));

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
    const { match: { params: { categoryId } } = {} } = this.props;
    const { match: { params: { categoryId: prevCategoryId } } = {} } = prevProps;

    if (categoryId !== prevCategoryId) {
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
    const { selectedCategory: { name } = {} } = this.props;

    return (
      <div className="ProductList">
        <h1 className="ProductList-Heading">{name}</h1>
        {this.renderProductList()}
      </div>
    );
  }
}

export default withRouter(ProductList);
