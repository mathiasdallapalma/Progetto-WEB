import React from 'react';
import './CustomerInfo.css';

const CustomerInfo = ({ customerInfo, onClose }) => {
  if (!customerInfo) return null;

  return (
    <div className="popup" role="alert" aria-relevant="all" aria-label="Customer info window">
      <div className="popup-content">
        <button className="close-button" onClick={onClose} role="button" aria-roledescription="exit button" tabindex="1"  >&times;</button>
        <h3 aria-label="Customer informations">Customer Information</h3>
        <p aria-label="customer code" tabindex="0" ><strong>Code:</strong> {customerInfo.CUST_CODE}</p>
        <p aria-label="customer Name" tabindex="0"  ><strong>Name:</strong> {customerInfo.CUST_NAME}</p>
        <p aria-label="customer City" tabindex="0"  ><strong>City:</strong> {customerInfo.CUST_CITY}</p>
        <p aria-label="customer Area" tabindex="0"  ><strong>Area:</strong> {customerInfo.WORKING_AREA}</p>
        <p aria-label="customer Country" tabindex="0"  ><strong>Country:</strong> {customerInfo.CUST_COUNTRY}</p>
        <p aria-label="customer Grade" tabindex="0"  ><strong>Grade:</strong> {customerInfo.GRADE}</p>
        <p aria-label="customer Opening" tabindex="0"  ><strong>Opening AMT:</strong> {customerInfo.OPENING_AMT}</p>
        <p aria-label="customer Receive" tabindex="0"  ><strong>Receive AMT:</strong> {customerInfo.RECEIVE_AMT}</p>
        <p aria-label="customer Payment" tabindex="0"  ><strong>Payment AMT:</strong> {customerInfo.PAYMENT_AMT}</p>
        <p aria-label="customer Outstanding" tabindex="0"  ><strong>Outstanding AMT:</strong> {customerInfo.OUTSTANDING_AMT}</p>
        <p aria-label="customer Phone" tabindex="0"  ><strong>Phone:</strong> {customerInfo.PHONE_NO}</p>
      </div>
    </div>
  );
};

export default CustomerInfo;