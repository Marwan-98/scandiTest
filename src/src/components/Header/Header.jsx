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
      loading: false,
    };
  }

  async fetchData() {
    this.setState({ loading: true });

    try {
      const { updateSelectedCategory, selectedCategory: { id: selectedCategoryId = 1 } = {} } = this.props;
      const pathname = window.location.pathname.split("/");
      const param = pathname[pathname.length - 1];
      const categoryId = pathname.includes("category") ? param : selectedCategoryId;

      const data = await request(process.env.REACT_APP_BASE_URL, CATEGORIES_LIST);

      this.setState({ categories: data.categories });

      const categoryData = await request(process.env.REACT_APP_BASE_URL, CATEGORY_BY_ID(categoryId));
      updateSelectedCategory(categoryData.category);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { selectedCategory: { id } = {}, updateSelectedCategory } = this.props;

    const { categories, loading } = this.state;

    if (loading || !id) {
      return null;
    }

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
                  onClick={() => updateSelectedCategory(category)}
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
