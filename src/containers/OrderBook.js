import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import Container from "react-bootstrap/Container";
import Sockette from "sockette";

import BidsBook from "../components/OrderBook/BidsBook";
import AsksBook from "../components/OrderBook/AsksBook";
import TradesList from "../components/Trades/TradesList";

import { connect } from "react-redux";
import updateBidsOrderBook from "../store/OrderBook/actions/update_bids";
import clearBidsOrderBook from "../store/OrderBook/actions/clear_bids";
import updateAsksOrderBook from "../store/OrderBook/actions/update_asks";
import clearAsksOrderBook from "../store/OrderBook/actions/clear_asks";
import updateTrades from "../store/Trades/actions/update_trades";
import { bindActionCreators } from "redux";

import "../css/OrderBook.css";

// const websocketURL = "wss://api.bitfinex.com/ws/2";
const websocketURL = "ws://localhost:9001";
var marketId = 0;

let ws;
class OrderBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marketName: "Trump impeachment 2020",
      marketSymbol: "TRUMP",
      connectionReady: true,
      isConnected: false,
      pres: "P0",
      volume24h: 0,
      lastPrice: 0,
      priceChange: 0
    };
  }

  subscribeToAll() {
    console.log("Subscribing to " + websocketURL + "...");
    const self = this;
    let payloadData = {};
    function onOpen(msg) {
      console.log("Connected to " + websocketURL);
      console.log(msg);
      var responseText = "getMarket " + marketId;
      ws.send(responseText);
      self.setState({ connectionReady: true });
    }
    function onMessage(msg) {
      payloadData = JSON.parse(msg.data);
      console.log("Received payload data: " + JSON.stringify(payloadData));
    }
    function onClose(msg) {
      console.log("Connection closed.");
      console.log(msg);
    }
    function onError(msg) {
      console.log("Error detected!");
      console.log(msg);
    }
    ws = new WebSocket(websocketURL);
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onclose = onClose;
    ws.onerror = onError;
    this.setState({ isConnected: true });
  }

  closeConnection() {
    ws.close();
    this.setState({ isConnected: false });
  }

  formmatNumberWithCommas(currentNumber) {
    return currentNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let priceChangeColor =
      this.state.priceChange >= 0 ? "rgba(82,108,46)" : "rgba(139,42,2)";
    priceChangeColor =
      this.state.priceChange === 0 ? "white" : priceChangeColor;

    let priceChangeSign = this.state.priceChange >= 0 ? " +" : " -";
    priceChangeSign = this.state.priceChange === 0 ? "" : priceChangeSign;

    return (
      <Container fluid={true}>
        <Row>
          <Col lg={12} className="buttons-container text-left">
            <div className="ticker-container text-left">
              <h3>
                {this.state.marketName} [{this.state.marketSymbol}]
              </h3>
              <p>
                Last Price:{" "}
                {this.formmatNumberWithCommas(this.state.lastPrice.toFixed(3))}{" "}
                / 24h Volume:{" "}
                {this.formmatNumberWithCommas(this.state.volume24h.toFixed(3))}
              </p>
              <p style={{ color: priceChangeColor }}>
                Price Change:{priceChangeSign}{" "}
                {this.state.priceChange.toFixed(2)}%
              </p>
            </div>
            <ButtonToolbar>
              <Button
                variant="dark"
                disabled={!this.state.connectionReady || this.state.isConnected}
                onClick={this.subscribeToAll.bind(this)}
              >
                Connect
              </Button>
              <Button
                variant="dark"
                disabled={!this.state.isConnected}
                onClick={this.closeConnection.bind(this)}
              >
                Disconnect
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
        <Row>
          <Col lg={9}>
            <Container fluid={true}>
              <Row>
                <Col lg={12}>
                  <h3 className="text-left">Order Book</h3>
                </Col>
                <Col lg={6} className="bids-container">
                  <BidsBook orderBookBids={this.props.orderBookBids} />
                </Col>
                <Col lg={6} className="asks-container">
                  <div className="depth-bars-asks-container" />
                  <AsksBook orderBookAsks={this.props.orderBookAsks} />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col lg={3}>
            <Row>
              <Col lg={12}>
                <h3 className="text-left">Market Trades</h3>
              </Col>
              <Col lg={12}>
                <TradesList tradesList={this.props.tradesList} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderBookBids: state.orderBookBids,
    orderBookAsks: state.orderBookAsks,
    tradesList: state.tradesList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateAsksOrderBook: updateAsksOrderBook,
      updateBidsOrderBook: updateBidsOrderBook,
      updateTrades: updateTrades,
      clearBidsOrderBook: clearBidsOrderBook,
      clearAsksOrderBook: clearAsksOrderBook
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBook);
