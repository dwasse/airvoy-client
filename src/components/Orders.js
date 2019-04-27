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
      // if (this.props.orders[index - 1]) {
      //   if (row.amount > 0 && this.props.orders[index - 1].amount < 0) {
      //     // Spread table element
      //     console.log("Rendering spread");
      //     var spread = row.price - this.props.orders[index - 1].price;
      //     return <tr className="spread-row" key={"Spread: " + spread} />;
      //   }
      // }
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
                right: "0px",
                background: "rgba(82,108,46, 0.3)",
                width: `calc(${((100 * row.total) / total).toFixed(0) *
                  self.state.zoom}%)`,
                height: "36px"
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
                self.state.zoom}%)`,
              height: "36px"
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
    }, this);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Table responsive>
          {/* <thead>
            <tr>
              <th />
              <th className="text-right" style={{ width: "50px" }}>
                <div className="orderbook">Price</div>
              </th>
              <th className="text-right">
                <div className="orderbook">Amount</div>
              </th>
              <th className="text-right">
                <div className="orderbook">Total</div>
              </th>
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <th />
              <th className="text-right" style={{ width: "50px" }}>
                <div className="orderbook">Price</div>
              </th>
              <th className="text-right">
                <div className="orderbook">Amount</div>
              </th>
              <th className="text-right">
                <div className="orderbook">Total</div>
              </th>
            </tr>
            {this.renderOrders()}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Orders;
