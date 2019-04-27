import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import Container from "react-bootstrap/Container";
import Sockette from "sockette";

import BidsBook from "../components/OrderBook/BidsBook";
import AsksBook from "../components/OrderBook/AsksBook";
import Orders from "../components/Orders";
import TradesList from "../components/Trades/TradesList";

import { connect } from "react-redux";
import updateBidsOrderBook from "../store/OrderBook/actions/update_bids";
import clearBidsOrderBook from "../store/OrderBook/actions/clear_bids";
import updateAsksOrderBook from "../store/OrderBook/actions/update_asks";
import updateOrders from "../store/OrderBook/actions/update_orders";
import clearOrders from "../store/OrderBook/actions/clear_orders";
import clearAsksOrderBook from "../store/OrderBook/actions/clear_asks";
import updateTrades from "../store/Trades/actions/update_trades";
import { bindActionCreators } from "redux";
import "../css/OrderBook.css";
// require("logo_1.png");

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
      volume24h: 0,
      lastPrice: 0,
      priceChange: 0
    };
    this.subscribeToAll();
    console.log("Props: " + JSON.stringify(props));
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
    }
    function onMessage(msg) {
      payloadData = JSON.parse(msg.data);
      for (var i = 0; i < payloadData.length; i++) {
        var entry = payloadData[i];
        if (entry["Type"] === "Order") {
          console.log("Adding order: " + JSON.stringify(entry));
          self.props.updateOrders({
            price: parseFloat(entry["Price"].toFixed(3)),
            amount: parseFloat(entry["Amount"].toFixed(3))
          });
        }
      }
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
  }

  closeConnection() {
    ws.close();
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
          <Col lg={4} className="buttons-container text-left">
            <img src={"logo_1.png"} alt="Logo" />
            <div className="ticker-container text-left">
              <Dropdown className="market-dropdown">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {this.state.marketName} [{this.state.marketSymbol}]
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#action-1">Another market</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <h5>
                <p>
                  Last Price:{" "}
                  {this.formmatNumberWithCommas(
                    this.state.lastPrice.toFixed(3)
                  )}{" "}
                  / Volume:{" "}
                  {this.formmatNumberWithCommas(
                    this.state.volume24h.toFixed(3)
                  )}
                </p>
                <p style={{ color: priceChangeColor }}>
                  Price Change:{priceChangeSign}{" "}
                  {this.state.priceChange.toFixed(2)}%
                </p>
              </h5>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <Container>
              <Row>
                <Col>
                  <h4 className="text-left">Order Book</h4>
                </Col>
              </Row>
              <Row>
                <Col className="orderbook-container">
                  <Orders orders={this.props.orders} />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col lg={7}>
            <Row>
              <Col lg={12}>
                <h3 className="text-left">Market Trades</h3>
              </Col>
              <Col lg={4}>
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
    orders: state.orders,
    orderBookBids: state.orderBookBids,
    orderBookAsks: state.orderBookAsks,
    tradesList: state.tradesList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateOrders: updateOrders,
      updateAsksOrderBook: updateAsksOrderBook,
      updateBidsOrderBook: updateBidsOrderBook,
      updateTrades: updateTrades,
      clearOrders: clearOrders,
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
