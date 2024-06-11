import React, { useState, useEffect } from 'react';

const OrderEditPopup = ({ order, onSave, onClose }) => {
  const [orderData, setOrderData] = useState(order);

  useEffect(() => {
    setOrderData(order);
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(orderData);
  };

  if (!order) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Edit Order</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Order ID</label>
            <input name="orderID" value={orderData.orderID} onChange={handleChange} disabled />
          </div>
          <div>
            <label>Customer Code</label>
            <input name="CUST_CODE" value={orderData.CUST_CODE} onChange={handleChange} />
          </div>
          <div>
            <label>Order Amount</label>
            <input name="ORD_AMOUNT" value={orderData.ORD_AMOUNT} onChange={handleChange} />
          </div>
          {/* Add more fields as necessary */}
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default OrderEditPopup;