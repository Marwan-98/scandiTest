import React, { Component } from "react";
import AttributeItem from "../AttributeItem/AttributeItem";
import "./Attribute.style.scss";

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
      size,
    } = this.props;

    return (
      <div className={`Attribute-AttributeSet-${size}`}>
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
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Attribute;
