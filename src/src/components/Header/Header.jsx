import React, { Component } from "react";
import logo from "../../logo.png";
import cartIcon from "./cart.png";
import "./Header.style.scss";
import CartOverlay from "../CartOverlay/CartOverlay";
import { Link } from "react-router-dom";
import WithRouter from "../../WithRouter";
import { DataContext } from "../../DataContext";
import { CATEGORIES_LIST } from "../../constants/queries";
import request from "graphql-request";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async fetchData() {
    try {
      const categoriesList = await request("http://localhost:8000/", CATEGORIES_LIST);

      this.setState({ categories: categoriesList });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {
      selectedCategory: { id },
    } = this.props;

    return (
      <DataContext.Consumer>
        {({ cartData: { itemsCount }, isCartOverlayVisible, updateCartOverlayVisibilty }) => (
          <header className="Header">
            <nav className="Header-Nav">
              {this.state.categories.categories?.map((category) => (
                <Link
                  to={`/category/${category.id}`}
                  key={category.id}
                  className={`Header-Nav-Item ${id === category.id ? "Header-Nav-Item-Selected" : ""}`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            <img src={logo} alt="logo" height={41} width={41} />
            <div onClick={() => updateCartOverlayVisibilty()} className="Cart">
              {itemsCount > 0 && <span className="Cart-ItemsCount">{itemsCount}</span>}
              <img src={cartIcon} alt="cart icon" height={20} width={20} />
            </div>
            {isCartOverlayVisible && <CartOverlay />}
          </header>
        )}
      </DataContext.Consumer>
    );
  }
}

export default WithRouter(Header);
