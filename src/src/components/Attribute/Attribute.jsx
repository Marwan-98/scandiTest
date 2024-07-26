import React, { Component } from "react";
import AttributeItem from "../AttributeItem/AttributeItem";
import "./Attribute.style.scss";
import { toKebabCase } from "../../utils/toKebabCase";

export class Attribute extends Component {
  canUpdateAttribute(item) {
    const {
      attribute: { id: attributeId },
      updateSelectedAttributes,
    } = this.props;

    if (updateSelectedAttributes) {
      updateSelectedAttributes({
        id: attributeId,
        itemId: item.id,
      });

      return;
    }

    return null;
  }

  render() {
    const {
      attribute: { id: attributeId, name, items, type },
      selectedAttributes,
      isInCartList,
    } = this.props;

    if (isInCartList) {
      return (
        <div
          className={`Attribute-AttributeSet Attribute-AttributeSet-cart`}
          data-testid={`cart-item-attribute-${toKebabCase(name)}`}
        >
          <h2 className="Attribute-SubTitle">{name}:</h2>
          <div className="Attribute-AttributeOptions">
            {items.map((item) => (
              <AttributeItem
                key={item.id}
                attributeId={attributeId}
                item={item}
                selectedAttributes={selectedAttributes}
                onClick={() => this.canUpdateAttribute(item)}
                type={type}
                attributeName={name}
                isInCartList
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`Attribute-AttributeSet Attribute-AttributeSet-page`}
        data-testid={`product-attribute-${toKebabCase(name)}`}
      >
        <h2 className="Attribute-SubTitle">{name}:</h2>
        <div className="Attribute-AttributeOptions">
          {items.map((item) => (
            <AttributeItem
              key={item.id}
              attributeId={attributeId}
              item={item}
              selectedAttributes={selectedAttributes}
              onClick={() => this.canUpdateAttribute(item)}
              type={type}
              attributeName={name}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Attribute;
