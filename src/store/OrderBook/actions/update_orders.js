function updateOrders(newOrderData) {
  return {
    type: "UPDATE_ORDERS",
    newOrderData: newOrderData
  };
}
export default updateOrders;
