import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './OrderEditPopup.css';

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
    <div className="popup" role="alert" aria-relevant="all" aria-label="Edit order window">
      <div className="popup-content">
        <h2>Edit Order</h2>
        <form onSubmit={handleSubmit} className="edit-form" role="form">
          <div className="form-group">
            <label for="customer code">Customer Code</label>
            <input name="CUST_CODE" value={orderData.CUST_CODE} onChange={handleChange} role="input" aria-required="false" tabindex="0" aria-selected="true"/>
          </div>
          <div className="form-group">
            <label for="order amount">Order Amount</label>
            <input name="ORD_AMOUNT" value={orderData.ORD_AMOUNT} onChange={handleChange} role="input" aria-required="false" tabindex="0" aria-selected="false"/>
          </div>
          <div className="form-group">
            <label for="advance amount">Advance Amount</label>
            <input name="ADVANCE_AMOUNT" value={orderData.ADVANCE_AMOUNT} onChange={handleChange} role="input" aria-required="false" tabindex="0" aria-selected="false"/>
          </div>
          <div className="form-group">
            <label for="Order date" role="calendar" aria-roledescription="Date formatted as day / month / year as numbers">Order Date</label>
            <DatePicker
              selected={new Date(orderData.ORD_DATE)}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              className="date-picker"
              role="input" aria-required="false" tabindex="0" aria-selected="false"/>
          </div>
          <div className="form-group">
            <label for="order description">Order Description</label>
            <input name="ORD_DESCRIPTION" value={orderData.ORD_DESCRIPTION} onChange={handleChange} role="input" aria-required="false" tabindex="0" aria-selected="false"/>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-save" role="button" aria-roledescription="save button" tabindex="0" aria-selected="false">Save</button>
            <button type="button" className="btn btn-cancel" onClick={onClose} role="button" aria-roledescription="cancel button" tabindex="0" aria-selected="false">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderEditPopup;