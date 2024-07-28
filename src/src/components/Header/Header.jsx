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
      const { updateSelectedCategory, selectedCategory: { name: categoryId = "all" } = {} } = this.props;

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
                  to={`/${category.name}`}
                  key={category.id}
                  className={`Header-Nav-Item ${id === category.id ? "Header-Nav-Item-Selected" : ""}`}
                  onClick={() => updateSelectedCategory(category)}
                  data-testid={`${id === category.id ? "active-category-link" : "category-link"}`}
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
