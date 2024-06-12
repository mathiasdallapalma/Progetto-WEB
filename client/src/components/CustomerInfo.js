import React from 'react';
import './CustomerInfo.css';

const CustomerInfo = ({ customerInfo, onClose }) => {
  if (!customerInfo) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h3>Customer Information</h3>
        <p><strong>Code:</strong> {customerInfo.CUST_CODE}</p>
        <p><strong>Name:</strong> {customerInfo.CUST_NAME}</p>
        <p><strong>City:</strong> {customerInfo.CUST_CITY}</p>
        <p><strong>Area:</strong> {customerInfo.WORKING_AREA}</p>
        <p><strong>Country:</strong> {customerInfo.CUST_COUNTRY}</p>
        <p><strong>Grade:</strong> {customerInfo.GRADE}</p>
        <p><strong>Opening AMT:</strong> {customerInfo.OPENING_AMT}</p>
        <p><strong>Receive AMT:</strong> {customerInfo.RECEIVE_AMT}</p>
        <p><strong>Payment AMT:</strong> {customerInfo.PAYMENT_AMT}</p>
        <p><strong>Outstanding AMT:</strong> {customerInfo.OUTSTANDING_AMT}</p>
        <p><strong>Phone:</strong> {customerInfo.PHONE_NO}</p>
      </div>
    </div>
  );
};

export default CustomerInfo;