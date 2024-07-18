import React, { Component } from "react";
import "./ProductList.style.scss";
import ProductListItem from "../ProductListItem/ProductListItem.jsx";
import { request } from "graphql-request";
import { CATEGORY_BY_ID, PRODUCT_BY_CATEGORY } from "../../constants/queries.js";
import WithRouter from "../../WithRouter.jsx";

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
      const categoryData = await request("http://localhost:8000/", CATEGORY_BY_ID(this.props.router.params.categoryId));

      this.props.updateSelectedCategory(categoryData.category);

      const productData = await request(
        "http://localhost:8000/",
        PRODUCT_BY_CATEGORY(this.props.router.params.categoryId)
      );

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
    if (prevProps.router.params.categoryId !== this.props.router.params.categoryId) {
      this.fetchData();
    }
  }

  render() {
    const { selectedCategory: { name } = {} } = this.props;
    const { loading } = this.state;

    if (loading) {
      return null;
    }

    return (
      <div className="ProductList">
        <h1 className="ProductList-Heading">{name}</h1>
        <div className="ProductList-List">
          {this.state.products?.map((product, idx) => (
            <ProductListItem product={product} key={idx} />
          ))}
        </div>
      </div>
    );
  }
}

export default WithRouter(ProductList);
