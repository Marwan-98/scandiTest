import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header.jsx";
import ProductList from "./components/ProductList/ProductList.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import { Component } from "react";
import { DataProvider } from "./DataContext.js";

class App extends Component {
  render() {
    return (
      <DataProvider>
        <div className="App">
          <BrowserRouter>
            <Header />
            <main>
              {/* <div className={`Overlay ${this.state.cartActive && "Overlay-Active"}`} /> */}
              <Routes>
                <Route path="/category/:categoryId" element={<ProductList />} />
                <Route path="/products/:productId" element={<ProductDetails />} />
              </Routes>
            </main>
          </BrowserRouter>
        </div>
      </DataProvider>
    );
  }
}

export default App;
