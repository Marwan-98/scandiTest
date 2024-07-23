import React, { Component } from "react";

class ChevronIcon extends Component {
  render() {
    const { rotate, onClick } = this.props;

    return (
      <svg
        width="10"
        height="17"
        transform={`rotate(${rotate ?? 0} 0 0)`}
        viewBox="0 0 10 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick ?? null}
      >
        <path
          d="M8.96873 1.16618L1.53955 8.58748L8.96873 16.0088"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export default ChevronIcon;
