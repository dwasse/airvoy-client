import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

class AsksBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 1
    };
  }

  renderAskRows() {
    let self = this;
    if (!this.props.orderBookAsks) {
      return <h2>Loading...</h2>;
    }
    return this.props.orderBookAsks.map(function(row, index) {
      let amountAbs = Math.abs(row.amount);
      return (
        <tr key={row.price}>
          <td
            style={{
              display: index > 23 ? "none" : "initial",
              position: "absolute",
              left: "0px",
              background: "rgba(139,42,2, 0.3)",
              width: `calc(${(
                (100 * row.total) /
                self.props.orderBookAsks[self.props.orderBookAsks.length - 1]
                  .total
              ).toFixed(0) * self.state.zoom}% - 20px)`,
              height: "54px"
            }}
          />
          <td className="text-right">
            <h4>{row.price}</h4>
          </td>
          <td className="text-right">
            <h4>{amountAbs}</h4>
          </td>
          <td className="text-right">
            <h4>{row.total}</h4>
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
          <tbody>{this.renderAskRows()}</tbody>
        </Table>
      </div>
    );
  }
}

export default AsksBook;
