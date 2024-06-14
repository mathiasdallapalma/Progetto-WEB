import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FocusTrap from 'focus-trap-react';
import './OrderEditPopup.css';

const OrderEditPopup = ({ order, onSave, onClose }) => {
  const [orderData, setOrderData] = useState(order);
  const popupRef = useRef(null);

  useEffect(() => {
    setOrderData(order);
  }, [order]);

  useEffect(() => {
    const handleTabPress = (e) => {
      if (e.key === 'Tab' && popupRef.current) {
        const focusableElements = popupRef.current.querySelectorAll('input, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // if shift key pressed for shift + tab combination
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // if tab key is pressed
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTabPress);
    return () => {
      document.removeEventListener('keydown', handleTabPress);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setOrderData({ ...orderData, ORD_DATE: formattedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(orderData);
  };

  if (!order) return null;

  return (
    <div className="popup" role="alert" aria-relevant="all" aria-label="Edit order window">
      <FocusTrap focusTrapOptions={{ initialFocus: false }}>
        <div className="popup-content" ref={popupRef}>
          <h2>Edit Order</h2>
          <form onSubmit={handleSubmit} className="edit-form" role="form">
            <div className="form-group">
              <label htmlFor="customer-code">Customer Code</label>
              <input name="CUST_CODE" value={orderData.CUST_CODE} onChange={handleChange} role="input" aria-required="false" tabIndex="0" aria-selected="true" id="customer-code"/>
            </div>
            <div className="form-group">
              <label htmlFor="order-amount">Order Amount</label>
              <input name="ORD_AMOUNT" value={orderData.ORD_AMOUNT} onChange={handleChange} role="input" aria-required="false" tabIndex="0" aria-selected="false" id="order-amount"/>
            </div>
            <div className="form-group">
              <label htmlFor="advance-amount">Advance Amount</label>
              <input name="ADVANCE_AMOUNT" value={orderData.ADVANCE_AMOUNT} onChange={handleChange} role="input" aria-required="false" tabIndex="0" aria-selected="false" id="advance-amount"/>
            </div>
            <div className="form-group">
              <label htmlFor="order-date" role="calendar" aria-roledescription="Date formatted as day / month / year as numbers">Order Date</label>
              <DatePicker
                selected={new Date(orderData.ORD_DATE)}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="date-picker"
                role="input" aria-required="false" tabIndex="0" aria-selected="false" id="order-date"/>
            </div>
            <div className="form-group">
              <label htmlFor="order-description">Order Description</label>
              <input name="ORD_DESCRIPTION" value={orderData.ORD_DESCRIPTION} onChange={handleChange} role="input" aria-required="false" tabIndex="0" aria-selected="false" id="order-description"/>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-save" role="button" aria-roledescription="save button" tabIndex="0" aria-selected="false">Save</button>
              <button type="button" className="btn btn-cancel" onClick={onClose} role="button" aria-roledescription="cancel button" tabIndex="0" aria-selected="false">Cancel</button>
            </div>
          </form>
        </div>
      </FocusTrap>
    </div>
  );
};

export default OrderEditPopup;
