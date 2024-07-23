import React, { Component } from "react";
import { DataContext } from "../../DataContext";
import PlusIcon from "../PlusIcon/PlusIcon";
import MinusIcon from "../MinusIcon/MinusIcon";

export class QuantityControl extends Component {
  render() {
    const { productId, selectedAttributes, productQuantity } = this.props;

    return (
      <DataContext.Consumer>
        {({ updateProductQuantity }) => (
          <div className="CartOverlay-ProductCount">
            <div
              className="CartOverlay-CountControl"
              onClick={() => updateProductQuantity({ id: productId, selectedAttributes }, 1)}
            >
              <PlusIcon />
            </div>
            <div className="CartOverlay-CountNumber">
              <span>{productQuantity}</span>
            </div>
            <div
              className="CartOverlay-CountControl"
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
