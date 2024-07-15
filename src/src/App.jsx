import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header.jsx";
import ProductList from "./components/ProductList/ProductList.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = { cartActive: false };
    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    this.setState({ cartActive: !this.state.cartActive });
  }

  render() {
    return (
      <div className="App">
        <Header cartActive={this.state.cartActive} setCartActive={this.updateState} />
        <main>
          <div className={`Overlay ${this.state.cartActive && "Overlay-Active"}`} />
          <BrowserRouter>
            <Routes>
              <Route path="/all" element={<ProductList />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    );
  }
}

export default App;
