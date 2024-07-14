import React, { Component } from "react";
import logo from "../../logo.png";
import cartIcon from "./cart.png";
import "./Header.style.scss";
import CartOverlay from "../CartOverlay/CartOverlay";

class Header extends Component {
  log() {
    console.log(this.props);
  }

  render() {
    return (
      <header className="Header">
        <nav className="Header-Nav">
          <li className="Header-Nav-Item Header-Nav-Item-Selected">Women</li>
          <li className="Header-Nav-Item">Men</li>
          <li className="Header-Nav-Item">Kids</li>
        </nav>
        <img src={logo} alt="logo" height={41} width={41} />
        <img src={cartIcon} alt="cart icon" height={20} width={20} onClick={() => this.props.setCartActive()} />
        {this.props.cartActive && <CartOverlay />}
      </header>
    );
  }
}

export default Header;
