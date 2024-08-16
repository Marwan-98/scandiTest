import React, { Component } from "react";
import { capitalizeString } from "../../utils/capitalizeString";
import "./AttributeItem.style.scss";
import { toKebabCase } from "../../utils/toKebabCase";

export class AttributeItem extends Component {
  render() {
    const {
      item: { id: itemId, value, displayValue },
      onClick,
      type,
      selectedAttributes,
      attributeId,
      attributeName,
      isInCartList,
    } = this.props;

    if (isInCartList) {
      return (
        <div
          className={`AttributeItem AttributeItem-${capitalizeString(type)} ${
            selectedAttributes[attributeId]?.itemId === itemId ? "selected" : ""
          }`}
          style={{ backgroundColor: value }}
          onClick={onClick ?? null}
          data-testid={`cart-item-attribute-${toKebabCase(attributeName)}-${displayValue}${
            selectedAttributes[attributeId]?.itemId === itemId ? "-selected" : ""
          }`}
        >
          {displayValue}
        </div>
      );
    }

    return (
      <div
        className={`AttributeItem AttributeItem-${capitalizeString(type)} ${
          selectedAttributes[attributeId]?.itemId === itemId ? "selected" : ""
        }`}
        data-testid={`product-attribute-${toKebabCase(attributeName)}-${value}${
          selectedAttributes[attributeId]?.itemId === itemId ? "-selected" : ""
        }`}
        onClick={onClick ?? null}
      >
        {displayValue}
      </div>
    );
  }
}

export default AttributeItem;
