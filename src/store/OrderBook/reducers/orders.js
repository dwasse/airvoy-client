export default function(state = [], action) {
  switch (action.type) {
    case "UPDATE_ORDERS":
      let newState = action.newOrderData;
      let priceExists = false;

      console.log("Adding new order data: " + JSON.stringify(newState));

      if (state.length > 0) {
        state.map(function(row, index) {
          if (
            state[index].id &&
            newState.id &&
            state[index].id === newState.id
          ) {
            console.log("Order " + newState.id + " exists");
            if (newState.amount === 0) {
              console.log("Removing order " + newState.id);
              state.splice(index, 1);
            } else {
              console.log(
                "Updating order " +
                  newState.id +
                  " amount from " +
                  state[index].amount +
                  " to " +
                  newState.amount
              );
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

      console.log("newStateCombined: " + JSON.stringify(newStateCombined));

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
        newStateCombined.map(function(row, index) {
          console.log("Checking row: " + JSON.stringify(row));
          if (row.amount > 0) {
            var bidIndex = bidPrices.indexOf(row.price);
            console.log("bidIndex: " + bidIndex);
            if (bidIndex > 0 && bidIndex < bidPrices.length) {
              row.total =
                parseFloat(row.amount) +
                parseFloat(bidsDict[bidPrices[bidIndex - 1]]);
            } else {
              row.total = row.amount;
            }
          } else if (row.amount < 0) {
            var askIndex = askPrices.indexOf(row.price);
            console.log("askIndex: " + askIndex);
            if (askIndex > 0 && askIndex < askPrices.length) {
              row.total =
                Math.abs(parseFloat(row.amount)) +
                Math.abs(parseFloat(asksDict[askPrices[askIndex - 1]]));
            } else {
              row.total = Math.abs(row.amount);
            }
          }
        });
      }

      if (priceExists === true) {
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
