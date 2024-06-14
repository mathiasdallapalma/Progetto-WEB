import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './popup.css';

const OrderEditPopup = ({ order, onSave, onClose }) => {
  const [orderData, setOrderData] = useState(order);

  useEffect(() => {
    setOrderData(order);
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleDateChange = (date) => {
    // Converti l'oggetto Date in una stringa nel formato desiderato (esempio: "MM/dd/yyyy")
    const formattedDate = date.toISOString().split('T')[0]; // Converte in "yyyy-MM-dd"
    setOrderData({ ...orderData, ORD_DATE: formattedDate });
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
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Customer Code</label>
            <input name="CUST_CODE" value={orderData.CUST_CODE} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Order Amount</label>
            <input name="ORD_AMOUNT" value={orderData.ORD_AMOUNT} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Advance Amount</label>
            <input name="ADVANCE_AMOUNT" value={orderData.ADVANCE_AMOUNT} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Order Date</label>
            <DatePicker
              selected={new Date(orderData.ORD_DATE)}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              className="date-picker"
            />
          </div>
          <div className="form-group">
            <label>Order Description</label>
            <input name="ORD_DESCRIPTION" value={orderData.ORD_DESCRIPTION} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-save">Save</button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderEditPopup;