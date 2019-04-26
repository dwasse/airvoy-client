import { combineReducers } from "redux";
import OrderReducer from "./OrderBook/reducers/orders";
import OrderBookBidsReducer from "./OrderBook/reducers/bids";
import OrderBookAsksReducer from "./OrderBook/reducers/asks";
import TradesReducer from "./Trades/reducers/trades";

const rootReducer = combineReducers({
  orders: OrderReducer,
  orderBookBids: OrderBookBidsReducer,
  orderBookAsks: OrderBookAsksReducer,
  tradesList: TradesReducer
});

export default rootReducer;
