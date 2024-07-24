import React, { Component } from "react";
import logo from "../../logo.png";
import cartIcon from "./cart.png";
import "./Header.style.scss";
import CartOverlay from "../CartOverlay/CartOverlay";
import { Link } from "react-router-dom";
import { DataContext } from "../../DataContext";
import { CATEGORIES_LIST, CATEGORY_BY_ID } from "../../constants/queries";
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
      const { updateSelectedCategory } = this.props;

      const data = await request(process.env.REACT_APP_BASE_URL, CATEGORIES_LIST);

      this.setState({ categories: data.categories });
      updateSelectedCategory(data.categories[0]);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  async updateCategory(categoryId) {
    const { updateSelectedCategory } = this.props;

    const categoryData = await request(process.env.REACT_APP_BASE_URL, CATEGORY_BY_ID(categoryId));

    updateSelectedCategory(categoryData.category);
  }

  render() {
    const {
      selectedCategory: { id },
    } = this.props;

    const { categories } = this.state;

    return (
      <DataContext.Consumer>
        {({ cartData: { itemsCount }, isCartOverlayVisible, updateCartOverlayVisibilty }) => (
          <header className="Header">
            <nav className="Header-Nav">
              {categories?.map((category) => (
                <Link
                  to={`/category/${category.id}`}
                  key={category.id}
                  className={`Header-Nav-Item ${id === category.id ? "Header-Nav-Item-Selected" : ""}`}
                  onClick={() => this.updateCategory(category.id)}
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

export default Header;
