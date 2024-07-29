import "./App.scss";
import Header from "./components/Header/Header.jsx";
import ProductList from "./components/ProductList/ProductList.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import { Component } from "react";
import { DataContext } from "./DataContext.js";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom.min.js";

class App extends Component {
  render() {
    return (
      <DataContext.Consumer>
        {(context) => (
          <div className="App">
            <div className="App-Wrapper">
              <BrowserRouter>
                <Route
                  exact
                  path={["/products/:productId", "/:categoryId"]}
                  render={() => (
                    <Header
                      selectedCategory={context.selectedCategory}
                      updateSelectedCategory={context.updateSelectedCategory}
                    />
                  )}
                />

                <main>
                  <div className={`Overlay ${context.isCartOverlayVisible && "Overlay-Active"}`} />
                  <Switch>
                    <Route exact path="/" render={() => <Redirect to="/all" />} />
                    <Route path="/products/:productId">
                      <ProductDetails />
                    </Route>
                    <Route path="/:categoryId">
                      <ProductList
                        selectedCategory={context.selectedCategory}
                        updateSelectedCategory={context.updateSelectedCategory}
                      />
                    </Route>
                  </Switch>
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
