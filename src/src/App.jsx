import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header.jsx";
import ProductList from "./components/ProductList/ProductList.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import { Component } from "react";
import { DataContext } from "./DataContext.js";

class App extends Component {
  render() {
    return (
      <DataContext.Consumer>
        {(context) => (
          <div className="App">
            <div className="App-Wrapper">
              <BrowserRouter>
                <Header
                  selectedCategory={context.selectedCategory}
                  updateSelectedCategory={context.updateSelectedCategory}
                />
                <main>
                  <div className={`Overlay ${context.isCartOverlayVisible && "Overlay-Active"}`} />
                  <Routes>
                    <Route
                      path="/category/:categoryId"
                      element={
                        <ProductList
                          selectedCategory={context.selectedCategory}
                          updateSelectedCategory={context.updateSelectedCategory}
                        />
                      }
                    />
                    <Route path="/products/:productId" element={<ProductDetails />} />
                  </Routes>
                </main>
              </BrowserRouter>
            </div>
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default App;
