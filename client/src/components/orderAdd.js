import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FocusTrap from 'focus-trap-react';
import './popup.css';

const OrderAddPopup = ({ onSave, onClose }) => {
  const [orderData, setOrderData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null); // Stato per mantenere la data selezionata

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Imposta la data selezionata nello stato
    const formattedDate = date.toISOString().split('T')[0]; // Converte in "yyyy-MM-dd"
    setOrderData({ ...orderData, ORD_DATE: formattedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(orderData);
  };

  return (
   <FocusTrap focusTrapOptions={{ initialFocus: false }}>
    <div className="popup" role="alert" aria-relevant="all" aria-label="Add order window">
      <div className="popup-content">
        <h2>Add Order</h2>
        <form onSubmit={handleSubmit} className="edit-form" role="form">
          <div className="form-group">
            <label htmlFor="ord_number">Order Number</label>
            <input
              name="ORD_NUM"
              onChange={handleChange}
              id="ord_num"
              role="input"
              tabIndex="0"
              aria-label="Textbox for order number"
              aria-required="true"
              aria-multiline="false"
            />
          </div>
          <div className="form-group">
            <label htmlFor="c_code">Customer Code</label>
            <input
              name="CUST_CODE"
              onChange={handleChange}
              id="c_code"
              role="input"
              tabIndex="0"
              aria-label="Textbox for customer code"
              aria-required="true"
              aria-multiline="false"
            />
          </div>
          <div className="form-group">
            <label htmlFor="o_amount">Order Amount</label>
            <input
              name="ORD_AMOUNT"
              onChange={handleChange}
              id="o_amount"
              role="input"
              tabIndex="0"
              aria-label="Textbox for order amount"
              aria-required="true"
              aria-multiline="false"
            />
          </div>
          <div className="form-group">
            <label htmlFor="a_amount">Advance Amount</label>
            <input
              name="ADVANCE_AMOUNT"
              onChange={handleChange}
              id="a_amount"
              role="input"
              tabIndex="0"
              aria-label="Textbox for advance amount"
              aria-required="true"
              aria-multiline="false"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Order Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="date-picker"
              id="date"
              role="input"
              tabIndex="0"
              aria-label="Textbox for date, format should be as numbers DAY / MONTH / YEAR"
              aria-required="true"
              aria-multiline="false"
            />
          </div>
          <div className="form-group">
            <label htmlFor="o_desc">Order Description</label>
            <input
              name="ORD_DESCRIPTION"
              onChange={handleChange}
              id="o_desc"
              role="input"
              tabIndex="0"
              aria-label="Textbox for order description"
              aria-required="true"
              aria-multiline="false"
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-save"
              role="button"
              aria-roledescription="save button"
              tabIndex="0"
              aria-label="Save the order"
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              onClick={onClose}
              role="button"
              aria-roledescription="cancel button"
              tabIndex="0"
              aria-label="No, do not save the order"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
   </FocusTrap>
  );
};

export default OrderAddPopup;