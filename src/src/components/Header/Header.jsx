import React, { Component } from "react";
import logo from "../../logo.png";
import cartIcon from "./cart.png";
import "./Header.style.scss";
import CartOverlay from "../CartOverlay/CartOverlay";
import { DataContext } from "../../DataContext";
import { CATEGORIES_LIST, CATEGORY_BY_ID } from "../../constants/queries";
import request from "graphql-request";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min";

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
      const {
        updateSelectedCategory,
        match: { params: { categoryId } } = {},
        selectedCategory: { name: selectedCategoryName = "all" },
      } = this.props;

      const currentId = categoryId ? categoryId : selectedCategoryName;

      const data = await request(process.env.REACT_APP_BASE_URL, CATEGORIES_LIST);

      this.setState({ categories: data.categories });

      const { category } = await request(process.env.REACT_APP_BASE_URL, CATEGORY_BY_ID(currentId));

      updateSelectedCategory(category);
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
    const {
      match: { params: { categoryId } } = {},
      selectedCategory: { name: selectedCategoryName = "all" },
    } = this.props;

    const { categories, loading } = this.state;

    const currentId = categoryId ? categoryId : selectedCategoryName;

    if (loading) {
      return null;
    }

    return (
      <DataContext.Consumer>
        {({ cartData: { itemsCount }, isCartOverlayVisible, updateCartOverlayVisibilty, updateSelectedCategory }) => (
          <header className="Header">
            <nav className="Header-Nav">
              {categories?.map((category) => (
                <Link
                  to={`/${category.name}`}
                  key={category.id}
                  className={`Header-Nav-Item ${currentId === category.name ? "Header-Nav-Item-Selected" : ""}`}
                  data-testid={`${currentId === category.id ? "active-category-link" : "category-link"}`}
                  onClick={() => updateSelectedCategory(category)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            <img src={logo} alt="logo" height={41} width={41} />
            <div onClick={() => updateCartOverlayVisibilty()} className="Cart" data-testid="cart-btn">
              {itemsCount > 0 && (
                <span className="Cart-ItemsCount" data-testid="cart-count-bubble">
                  {itemsCount}
                </span>
              )}
              <img src={cartIcon} alt="cart icon" height={20} width={20} />
            </div>
            {isCartOverlayVisible && <CartOverlay />}
          </header>
        )}
      </DataContext.Consumer>
    );
  }
}

export default withRouter(Header);
