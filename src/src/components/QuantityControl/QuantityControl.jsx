import React, { Component } from "react";
import { DataContext } from "../../DataContext";
import PlusIcon from "../PlusIcon/PlusIcon";
import MinusIcon from "../MinusIcon/MinusIcon";
import "./QuantityControl.style.scss";

export class QuantityControl extends Component {
  render() {
    const { productId, selectedAttributes, productQuantity } = this.props;

    return (
      <DataContext.Consumer>
        {({ updateProductQuantity }) => (
          <div className="QuantityControl">
            <div
              className="QuantityControl-CountControl"
              onClick={() => updateProductQuantity({ id: productId, selectedAttributes }, 1)}
            >
              <PlusIcon />
            </div>
            <div className="QuantityControl-CountNumber">
              <span>{productQuantity}</span>
            </div>
            <div
              className="QuantityControl-CountControl"
              onClick={() => updateProductQuantity({ id: productId, selectedAttributes }, -1)}
            >
              <MinusIcon />
            </div>
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default QuantityControl;
