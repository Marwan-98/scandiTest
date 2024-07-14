import React, { Component } from "react";
import "./CartOverlay.style.scss";
import PlusIcon from "../PlusIcon/PlusIcon";
import productImage from "../ProductListItem/image.png";

class CartOverlay extends Component {
  render() {
    return (
      <div className="CartOverlay">
        <span>My Bag, 3 items</span>
        <div className="CartOverlay-ProductList">
          <div className="CartOverlay-ProductListItem">
            <div className="CartOverlay-ProductInfo">
              <div className="CartOverlay-ProductDetails">
                <h4 className="CartOverlay-ProductTitle">Running Short</h4>
                <h5 className="CartOverlay-ProductPrice">$50.00</h5>
                <div className="CartOverlay-ProductAttributes">
                  <div className="CartOverlay-ProductAttributeSet">
                    <h2 className="CartOverlay-ProductSubTitle">Size:</h2>
                    <div className="CartOverlay-ProductAttributeOptions">
                      <div className="CartOverlay-ProductAttributeOptions-Text">XS</div>
                      <div className="CartOverlay-ProductAttributeOptions-Text selected">S</div>
                      <div className="CartOverlay-ProductAttributeOptions-Text">M</div>
                      <div className="CartOverlay-ProductAttributeOptions-Text">L</div>
                    </div>
                  </div>
                  <div className="CartOverlay-ProductAttributeSet">
                    <h2 className="CartOverlay-ProductSubTitle">Color:</h2>
                    <div className="CartOverlay-ProductAttributeOptions">
                      <div
                        className="CartOverlay-ProductAttributeOptions-Color selected"
                        style={{ backgroundColor: "#D3D2D5" }}
                      >
                        XS
                      </div>
                      <div className="CartOverlay-ProductAttributeOptions-Color" style={{ backgroundColor: "#2B2B2B" }}>
                        S
                      </div>
                      <div className="CartOverlay-ProductAttributeOptions-Color" style={{ backgroundColor: "#0F6450" }}>
                        M
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="CartOverlay-ProductCount">
                <div className="CartOverlay-CountControl">
                  <PlusIcon />
                </div>
                <div className="CartOverlay-CountNumber">
                  <span>2</span>
                </div>
                <div className="CartOverlay-CountControl">
                  <PlusIcon />
                </div>
              </div>
            </div>
            <div className="CartOverlay-ProductImage">
              <img src={productImage} alt="product" />
            </div>
          </div>
          <div className="CartOverlay-ProductListItem">
            <div className="CartOverlay-ProductInfo">
              <div className="CartOverlay-ProductDetails">
                <h4 className="CartOverlay-ProductTitle">Running Short</h4>
                <h5 className="CartOverlay-ProductPrice">$50.00</h5>
                <div className="CartOverlay-ProductAttributes">
                  <div className="CartOverlay-ProductAttributeSet">
                    <h2 className="CartOverlay-ProductSubTitle">Size:</h2>
                    <div className="CartOverlay-ProductAttributeOptions">
                      <div className="CartOverlay-ProductAttributeOptions-Text">XS</div>
                      <div className="CartOverlay-ProductAttributeOptions-Text selected">S</div>
                      <div className="CartOverlay-ProductAttributeOptions-Text">M</div>
                      <div className="CartOverlay-ProductAttributeOptions-Text">L</div>
                    </div>
                  </div>
                  <div className="CartOverlay-ProductAttributeSet">
                    <h2 className="CartOverlay-ProductSubTitle">Color:</h2>
                    <div className="CartOverlay-ProductAttributeOptions">
                      <div
                        className="CartOverlay-ProductAttributeOptions-Color selected"
                        style={{ backgroundColor: "#D3D2D5" }}
                      >
                        XS
                      </div>
                      <div className="CartOverlay-ProductAttributeOptions-Color" style={{ backgroundColor: "#2B2B2B" }}>
                        S
                      </div>
                      <div className="CartOverlay-ProductAttributeOptions-Color" style={{ backgroundColor: "#0F6450" }}>
                        M
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="CartOverlay-ProductCount">
                <div className="CartOverlay-CountControl">
                  <PlusIcon />
                </div>
                <div className="CartOverlay-CountNumber">
                  <span>2</span>
                </div>
                <div className="CartOverlay-CountControl">
                  <PlusIcon />
                </div>
              </div>
            </div>
            <div className="CartOverlay-ProductImage">
              <img src={productImage} alt="product" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
