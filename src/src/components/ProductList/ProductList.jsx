import React, { Component } from "react";
import "./ProductList.style.scss";
import ProductListItem from "../ProductListItem/ProductListItem.jsx";
import { request } from "graphql-request";
import { PRODUCT_BY_CATEGORY } from "../../constants/queries.js";
import WithRouter from "../../WithRouter.jsx";

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidUpdate() {
    try {
      await request("http://localhost:8000/", PRODUCT_BY_CATEGORY(this.props.router.params.categoryId)).then((data) => {
        if (JSON.stringify(this.state.products) !== JSON.stringify(data.products)) {
          this.setState({ products: data.products });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    try {
      await request("http://localhost:8000/", PRODUCT_BY_CATEGORY(this.props.router.params.categoryId)).then((data) =>
        this.setState({ products: data.products })
      );
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="ProductList">
        <h1 className="ProductList-Heading">Women</h1>
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
