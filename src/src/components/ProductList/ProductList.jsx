import React, { Component } from "react";
import "./ProductList.style.scss";
import ProductListItem from "../ProductListItem/ProductListItem.jsx";
import { request } from "graphql-request";
import { PRODUCT_BY_CATEGORY } from "../../constants/queries.js";

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
        selectedCategory: { id: selectedCategory },
      } = this.props;

      const productData = await request(process.env.REACT_APP_BASE_URL, PRODUCT_BY_CATEGORY(selectedCategory));

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

  componentDidUpdate(prevProps) {
    const {
      selectedCategory: { id: selectedCategory },
    } = this.props;

    const {
      selectedCategory: { id: prevSelectedCategory },
    } = prevProps;

    if (selectedCategory !== prevSelectedCategory) {
      console.log(selectedCategory, prevSelectedCategory);
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

export default ProductList;
