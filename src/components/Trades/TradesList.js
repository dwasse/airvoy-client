import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class TradesList extends Component {
  renderTradesRows() {
    let self = this;
    let counter = 0;

    if (!this.props.tradesList) {
      return <h2>Loading...</h2>;
    }
    return this.props.tradesList.map(function(row, index) {
      let uniqueId = row.period + row.timestamp + row.amount + counter;
      uniqueId = uniqueId;
      if (self.props.tradesList[index - 1]) {
        uniqueId =
          uniqueId +
          (parseFloat(self.props.tradesList[index - 1].amount) +
            parseFloat(self.props.tradesList[index - 1].period) +
            self.props.tradesList[index - 1].timestamp);
        uniqueId = uniqueId + counter;
      }
      counter++;

      let amountAbs = Math.abs(row.amount).toFixed(4);
      let tradeType = row.amount > 0 ? "buy" : "sell";

      return (
        <tr key={uniqueId} className={tradeType}>
          <td className="text-right">
            <h4>{row.formattedTimestamp}</h4>
          </td>
          <td className="text-right">
            <h4>{row.price}</h4>
          </td>
          <td className="text-right">
            <h4>{amountAbs}</h4>
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
              <h4>Time</h4>
            </th>
            <th className="text-right">
              <h4>Price</h4>
            </th>
            <th className="text-right">
              <h4>Amount</h4>
            </th>
          </tr>
        </thead>
        <tbody>{this.renderTradesRows()}</tbody>
      </Table>
    );
  }
}

export default TradesList;
