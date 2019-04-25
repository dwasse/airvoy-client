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
              height: "37px"
            }}
          />
          <td className="text-right">{row.price}</td>
          <td className="text-right">{row.total}</td>
          <td className="text-right">{amountAbs}</td>
          <td className="text-center">{row.count}</td>
        </tr>
      );
    });
  }

  componentDidMount() {}

  zoomOut() {
    this.setState({ zoom: this.state.zoom - 0.2 });
  }

  zoomIn() {
    this.setState({ zoom: this.state.zoom + 0.2 });
  }

  render() {
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th />
              <th className="text-right" style={{ width: "50px" }}>
                Price
              </th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>{this.renderAskRows()}</tbody>
        </Table>
      </div>
    );
  }
}

export default AsksBook;
