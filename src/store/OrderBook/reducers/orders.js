export default function(state = [], action) {
  switch (action.type) {
    case "UPDATE_ORDERS":
      let newState = action.newOrderData;
      let priceExists = false;

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
            console.log(
              "Returning state slice: " + JSON.stringify(state.slice())
            );
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

      if (priceExists === true) {
        priceExists = false;
        return state.slice();
      } else {
        let newStateCombined = [...state, newState];
        //Sort from lowest to highest price before returning.
        newStateCombined.sort(function(a, b) {
          return b.price - a.price;
        });

        if (newStateCombined.length > 50) {
          newStateCombined.pop();
        }

        if (newStateCombined.length > 0) {
          newStateCombined.map(function(row, index) {
            if (!row || row.count === 0) {
              newStateCombined.splice(index, 1);
            }
          });

          newStateCombined.map(function(row, index) {
            if (row.amount > 0) {
              if (
                newStateCombined[index - 1] &&
                newStateCombined[index - 1].total &&
                newStateCombined[index - 1].amount > 0
              ) {
                row.total =
                  parseFloat(newStateCombined[index - 1].total) +
                  parseFloat(row.amount);
              } else {
                row.total = row.amount;
              }
            } else if (row.amount < 0) {
              if (
                newStateCombined[index + 1] &&
                newStateCombined[index + 1].total &&
                newStateCombined[index + 1].amount < 0
              ) {
                row.total =
                  parseFloat(newStateCombined[index + 1].total) +
                  Math.abs(parseFloat(row.amount));
              } else {
                row.total = Math.abs(row.amount);
              }
            }
          });
        }

        return newStateCombined;
      }
      break;

    case "CLEAR_ORDERS":
      return action.newOrderData;
      break;

    default:
      return state.slice();
  }
}
