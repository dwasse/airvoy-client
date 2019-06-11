export default function(state = [], action) {
  switch (action.type) {
    case "UPDATE_ORDERS":
      let newState = action.newOrderData;
      let priceExists = false;

      console.log("Adding new order data: " + JSON.stringify(newState));

      if (state.length > 0) {
        let orderIds = [];
        state.map(function(row, index) {
          if (
            state[index].id &&
            newState.id &&
            state[index].id === newState.id
          ) {
            for (i = 0; i < state.length; i++) {
              let currentOrder = state[i];
              if (!orderIds.includes(currentOrder.id)) {
                orderIds.unshift(currentOrder.id);
              } else {
                state.splice(i, 1);
              }
            }
            console.log(
              "State after clearing duplicate orders: " + JSON.stringify(state)
            );
            if (newState.amount === 0 || orderIds.includes(newState.id)) {
              state.splice(index, 1);
            } else {
              state[index].amount = newState.amount;
            }
            return state.slice();
          }
          if (
            state[index].price &&
            newState.price &&
            state[index].price === newState.price
          ) {
            //Price already exists, so it should only update current row.
            priceExists = true;
            state[index].count = newState.count;
            state[index].amount += newState.amount;
          }
        });
      }

      let newStateCombined = [...state, newState];
      //Sort from lowest to highest price before returning.
      newStateCombined.sort(function(a, b) {
        return b.price - a.price;
      });

      if (newStateCombined.length > 50) {
        newStateCombined.pop();
      }

      var bidsDict = {};
      var asksDict = {};
      var bidPrices = [];
      var askPrices = [];
      var includedOrders = [];

      if (newStateCombined.length > 0) {
        newStateCombined.map(function(row, index) {
          if (!row) {
            newStateCombined.splice(index, 1);
          } else {
            if (row.amount > 0 && !includedOrders.includes(row.id)) {
              console.log(
                "Inspecting bidsDict for bid: " + JSON.stringify(row)
              );
              if (row.price in bidsDict) {
                bidsDict[row.price] += row.amount;
                console.log(
                  "Added to bids dict for price " +
                    row.price +
                    ": " +
                    Math.abs(row.amount)
                );
              } else {
                bidsDict[row.price] = row.amount;
                bidPrices.unshift(row.price);
              }
              console.log("After bids inspect: " + JSON.stringify(bidsDict));
            } else if (row.amount < 0 && !includedOrders.includes(row.id)) {
              console.log(
                "Inspecting asksDict for ask: " + JSON.stringify(row)
              );
              if (row.price in asksDict) {
                asksDict[row.price] += Math.abs(row.amount);
                console.log(
                  "Added to asks dict for price " +
                    row.price +
                    ": " +
                    Math.abs(row.amount)
                );
              } else {
                asksDict[row.price] = Math.abs(row.amount);
                askPrices.unshift(row.price);
              }
              console.log("After asks inspect: " + JSON.stringify(asksDict));
            }
            includedOrders.unshift(row.id);
            console.log("Added " + row.id + " to includedOrders");
          }
        });
        console.log("newStateCombined: " + JSON.stringify(newStateCombined));
        bidPrices.sort(function(a, b) {
          return b - a;
        });
        askPrices.sort(function(a, b) {
          return a - b;
        });
        console.log("bidsDict: " + JSON.stringify(bidsDict));
        console.log("asksDict: " + JSON.stringify(asksDict));
        console.log("bidPrices: " + JSON.stringify(bidPrices));
        console.log("askPrices: " + JSON.stringify(askPrices));
        var bidTotals = {};
        var askTotals = {};
        var lastBidTotal = 0;
        var lastAskTotal = 0;
        for (var i = 0; i < bidPrices.length; i++) {
          var bid = bidPrices[i];
          if (bid in bidsDict) {
            lastBidTotal += bidsDict[bid];
            bidTotals[bid] = lastBidTotal;
          } else {
            console.log("Bid price " + bid + " not in bidsDict");
          }
        }
        for (var j = 0; j < askPrices.length; j++) {
          var ask = askPrices[j];
          if (ask in asksDict) {
            lastAskTotal += asksDict[ask];
            askTotals[ask] = lastAskTotal;
          } else {
            console.log("Ask price " + ask + " not in asksDict");
          }
        }
        console.log("bidTotals: " + JSON.stringify(bidTotals));
        console.log("askTotals: " + JSON.stringify(askTotals));
        newStateCombined.map(function(row, index) {
          console.log("Checking row: " + JSON.stringify(row));
          if (row.amount > 0) {
            if (row.price in bidTotals) {
              row.total = bidTotals[row.price];
            } else {
              console.log("Bid price " + row.price + " not in bidTotals");
            }
          } else if (row.amount < 0) {
            if (row.price in askTotals) {
              row.total = askTotals[row.price];
            } else {
              console.log("Ask price " + row.price + " not in askTotals");
            }
          }
        });
      }

      if (priceExists === true) {
        console.log("priceExists true");
        priceExists = false;
        return state.slice();
      } else {
        return newStateCombined;
      }

    case "CLEAR_ORDERS":
      return action.newOrderData;

    default:
      return state.slice();
  }
}
