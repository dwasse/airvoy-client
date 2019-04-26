import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = { zoom: 1 };
  }

  renderOrders() {
    console.log("Rendering orders: " + JSON.stringify(this.props.orders));
    let self = this;
    if (!this.props.orders) {
      return <h2>Loading...</h2>;
    }
    return this.props.orders.map(function(row, index) {
      var askTotal = 0;
      var bidTotal = 0;
      for (var i = 0; i < self.props.orders.length; i++) {
        var order = self.props.orders[i];
        if (order.amount > 0) {
          bidTotal += order.amount;
        } else if (order.amount < 0) {
          askTotal += Math.abs(order.amount);
        }
      }
      var total = askTotal > bidTotal ? askTotal : bidTotal;
      console.log(
        "Total: " +
          total +
          ", this width: " +
          ((100 * row.total) / total).toFixed(0)
      );
      if (row.amount > 0) {
        return (
          <tr className="bids-row" key={row.price}>
            <td
              style={{
                display: index > 23 ? "none" : "initial",
                position: "absolute",
                left: "0px",
                background: "rgba(82,108,46, 0.3)",
                width: `calc(${((100 * row.total) / total).toFixed(0) *
                  self.state.zoom}% - 20px)`,
                height: "54px"
              }}
            />
            <td className="text-right">
              <div className="orderbook">{row.price}</div>
            </td>
            <td className="text-right">
              <div className="orderbook">{row.amount}</div>
            </td>
            <td className="text-right">
              <div className="orderbook">{row.total}</div>
            </td>
          </tr>
        );
      }
      return (
        <tr className="asks-row" key={row.price}>
          <td
            style={{
              display: index > 23 ? "none" : "initial",
              position: "absolute",
              left: "0px",
              background: "rgba(139,42,2, 0.3)",
              width: `calc(${((100 * row.total) / total).toFixed(0) *
                self.state.zoom}% - 20px)`,
              height: "54px"
            }}
          />
          <td className="text-right">
            <div className="orderbook">{row.price}</div>
          </td>
          <td className="text-right">
            <div className="orderbook">{Math.abs(row.amount)}</div>
          </td>
          <td className="text-right">
            <div className="orderbook">{row.total}</div>
          </td>
        </tr>
      );
    });
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th />
              <th className="text-right" style={{ width: "50px" }}>
                <h4>Price</h4>
              </th>
              <th className="text-right">
                <h4>Amount</h4>
              </th>
              <th className="text-right">
                <h4>Total</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderOrders()}
            {/* <tr>
              <th>{this.renderOrders()}</th>
            </tr> */}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Orders;
