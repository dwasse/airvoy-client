import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <form className="order-form" onSubmit={this.executeOrder}>
        <tr className="order-form-row">
          <label className="order-form-label" for="priceInput">
            <div className="orderbook">Price:</div>
          </label>
          <input name="priceInput" className="order-form-input" type="number" />
        </tr>
        <tr className="order-form-row">
          <label className="order-form-label" for="sizeInput">
            <div className="orderbook">Size:</div>
          </label>
          <input name="sizeInput" className="order-form-input" type="number" />
        </tr>
        <tr className="order-form-row">
          <label className="order-form-label" for="orderFormDropdown">
            <div className="orderbook">Type:</div>
          </label>
          <Dropdown name="orderFormDropdown" className="order-type-dropdown">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Limit
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#action-1">Market</Dropdown.Item>
              <Dropdown.Item href="#action-2">Synthetic Margin</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </tr>
      </form>
    );
  }
}

export default OrderForm;
