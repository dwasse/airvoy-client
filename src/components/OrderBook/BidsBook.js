import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

class BidsBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 1
    };
  }

  renderBidRows() {
    let self = this;
    if (!this.props.orderBookBids) {
      return <h2>Loading...</h2>;
    }
    return this.props.orderBookBids.map(function(row, index) {
      return (
        <tr className="bids-row" key={row.price}>
          <td
            style={{
              display: index > 23 ? "none" : "initial",
              position: "absolute",
              left: "0px",
              background: "rgba(82,108,46, 0.3)",
              width: `calc(${(
                (100 * row.total) /
                self.props.orderBookBids[self.props.orderBookBids.length - 1]
                  .total
              ).toFixed(0) * self.state.zoom}% - 20px)`,
              height: "54px"
            }}
          />
          <td className="text-right">
            <h4>{row.price}</h4>
          </td>
          <td className="text-right">
            <h4>{row.amount}</h4>
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
          <tbody>{this.renderBidRows()}</tbody>
        </Table>
      </div>
    );
  }
}

export default BidsBook;
