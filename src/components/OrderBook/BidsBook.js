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
              right: "0px",
              background: "rgba(82,108,46, 0.3)",
              width: `calc(${(
                (100 * row.total) /
                self.props.orderBookBids[self.props.orderBookBids.length - 1]
                  .total
              ).toFixed(0) * self.state.zoom}% - 20px)`,
              height: "37px"
            }}
          />
          <td className="text-right">{row.amount}</td>
          <td className="text-right">{row.price}</td>
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
              <th className="text-right">Amount</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>{this.renderBidRows()}</tbody>
        </Table>
      </div>
    );
  }
}

export default BidsBook;
