import React, { Component } from "react";
import "./ProductList.style.scss";
import ProductListItem from "../ProductListItem/ProductListItem.jsx";
import { gql, request } from "graphql-request";

const document = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

class ProductList extends Component {
  async componentDidMount() {
    await request("https://flyby-router-demo.herokuapp.com/", document).then((data) => console.log(data));
  }

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
