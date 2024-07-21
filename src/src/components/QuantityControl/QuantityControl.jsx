import React, { Component } from "react";
import { DataContext } from "../../DataContext";
import PlusIcon from "../PlusIcon/PlusIcon";

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
              <PlusIcon />
            </div>
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default QuantityControl;
