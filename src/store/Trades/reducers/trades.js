import moment from "moment";

export default function(state = [], action) {
  switch (action.type) {
    case "UPDATE_TRADES":
      let newState = action.newTradesData;
      //   let newStateCombined = [...state, ...newState];
      let newStateCombined = [...state, newState];

      if (newStateCombined.length > 50) {
        newStateCombined.pop();
      }

      newStateCombined.map(function(trade) {
        let date = new Date();
        console.log("Setting date to " + trade.time);
        date.setTime(trade.time);
        let formattedTime =
          date.getUTCHours() +
          ":" +
          date.getUTCMinutes() +
          ":" +
          date.getUTCSeconds();
        console.log("Formatted time: " + formattedTime);
        trade.formattedTimestamp = formattedTime;
      });

      //Sort from most recent to last order made.
      newStateCombined.sort(function(a, b) {
        return b.time - a.time;
      });

      return newStateCombined;

    default:
      //returns a copy of the state object to trigger state change.
      return state.slice();
  }
}
