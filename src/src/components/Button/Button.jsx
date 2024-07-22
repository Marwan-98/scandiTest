import React, { Component } from "react";
import "./Button.style.scss";

export class Button extends Component {
  render() {
    const { title } = this.props;

    return <button {...this.props}>{title}</button>;
  }
}

export default Button;
