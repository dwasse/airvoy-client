function clearOrders(newOrderData) {
  return {
    type: "CLEAR_ORDERS",
    newAsksData: []
  };
}
export default clearOrders;
