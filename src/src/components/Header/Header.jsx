import React, { Component } from "react";
import logo from "../../logo.png";
import cartIcon from "./cart.png";
import "./Header.style.scss";
import CartOverlay from "../CartOverlay/CartOverlay";
import { Link } from "react-router-dom";
import WithRouter from "../../WithRouter";
import { DataContext } from "../../DataContext";

class Header extends Component {
  render() {
    return (
      <DataContext.Consumer>
        {({ cartData: { itemsCount }, isCartOverlayVisible, updateCartOverlayVisibilty }) => (
          <header className="Header">
            <nav className="Header-Nav">
              <Link to={"/all"} className="Header-Nav-Item Header-Nav-Item-Selected">
                All
              </Link>
              <Link to={"/clothes"} className="Header-Nav-Item">
                Clothes
              </Link>
              <Link to={"/tech"} className="Header-Nav-Item">
                Tech
              </Link>
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
