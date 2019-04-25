import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import OrderBook from "./containers/OrderBook";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./store/reducers";

import "./App.css";

const createStoreWithMiddleware = applyMiddleware()(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <div className="App">
          <OrderBook />
        </div>
      </Provider>
    );
  }
}

export default App;
