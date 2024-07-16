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

  async componentDidMount() {
    try {
      await request("http://192.168.1.8:80/scandiTest/", CATEGORIES_LIST).then((data) =>
        this.setState({ categories: data })
      );
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <DataContext.Consumer>
        {({ cartData: { itemsCount }, isCartOverlayVisible, updateCartOverlayVisibilty }) => (
          <header className="Header">
            <nav className="Header-Nav">
              {this.state.categories.categories?.map((category) => (
                <Link
                  to={`/category/${category.id}`}
                  key={category.id}
                  className={`Header-Nav-Item ${
                    this.props.router.location.pathname.includes(category.id) ? "Header-Nav-Item-Selected" : ""
                  }`}
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
