import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class TradesList extends Component {
  renderTradesRows() {
    console.log("Rendering trades rows...");
    console.log("Trades list: " + JSON.stringify(this.props.tradesList));
    let self = this;
    let counter = 0;

    if (!this.props.tradesList) {
      return <h2>Loading...</h2>;
    }
    return this.props.tradesList.map(function(row, index) {
      console.log("Rendering trade row: " + JSON.stringify(row));
      let uniqueId = row.id;
      // uniqueId = uniqueId;
      // if (self.props.tradesList[index - 1]) {
      //   uniqueId =
      //     uniqueId +
      //     (parseFloat(self.props.tradesList[index - 1].amount) +
      //       parseFloat(self.props.tradesList[index - 1].period) +
      //       self.props.tradesList[index - 1].timestamp);
      //   uniqueId = uniqueId + counter;
      // }
      // counter++;

      let amountAbs = Math.abs(row.amount).toFixed(4);
      let tradeType = row.amount > 0 ? "buy" : "sell";

      return (
        <tr key={uniqueId} className={tradeType}>
          <td className="text-right">
            <div className="trades">{row.formattedTimestamp}</div>
          </td>
          <td className="text-right">
            <div className="trades">{row.price}</div>
          </td>
          <td className="text-right">
            <div className="trades">{amountAbs}</div>
          </td>
        </tr>
      );
    });
  }

  componentDidMount() {}

  render() {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th className="text-right">
              <div className="trades">Time</div>
            </th>
            <th className="text-right">
              <div className="trades">Price</div>
            </th>
            <th className="text-right">
              <div className="trades">Amount</div>
            </th>
          </tr>
        </thead>
        <tbody>{this.renderTradesRows()}</tbody>
      </Table>
    );
  }
}

export default TradesList;
