import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

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
          <DropdownButton
            name="orderFormDropdown"
            className="order-type-dropdown"
            title="Limit"
          >
            <Dropdown.Item>
              Market<br />
            </Dropdown.Item>
            <Dropdown.Item>Synthetic Margin</Dropdown.Item>
          </DropdownButton>
        </tr>
      </form>
    );
  }
}

export default OrderForm;
