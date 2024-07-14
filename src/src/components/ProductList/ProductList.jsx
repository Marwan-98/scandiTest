import React, { Component } from "react";
import "./ProductList.style.scss";
import ProductListItem from "../ProductListItem/ProductListItem.jsx";

class ProductList extends Component {
  render() {
    return (
      <div className="ProductList">
        <h1 className="ProductList-Heading">Women</h1>
        <div className="ProductList-List">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProductListItem key={idx} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
