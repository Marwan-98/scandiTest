import React, { Component } from "react";
import { capitalizeString } from "../../utils/capitalizeString";
import "./AttributeItem.style.scss";

export class AttributeItem extends Component {
  render() {
    const {
      item: { id: itemId, value, displayValue },
      onClick,
      type,
      selectedAttributes,
      attributeId,
    } = this.props;

    return (
      <div
        className={`ProductDetails-AttributeOptions-${capitalizeString(type)}
        ${selectedAttributes[attributeId]?.itemId === itemId ? "selected" : ""}`}
        style={{ backgroundColor: value }}
        onClick={onClick ?? null}
      >
        {displayValue}
      </div>
    );
  }
}

export default AttributeItem;
