import React, { Component } from "react";
import logo from "../../logo.png";
import cartIcon from "./cart.png";
import "./Header.style.scss";
import CartOverlay from "../CartOverlay/CartOverlay";
import { Link } from "react-router-dom";
import WithRouter from "../../WithRouter";

class Header extends Component {
  render() {
    return (
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
        <img src={cartIcon} alt="cart icon" height={20} width={20} onClick={() => this.props.setCartActive()} />
        {this.props.cartActive && <CartOverlay />}
      </header>
    );
  }
}

export default WithRouter(Header);
