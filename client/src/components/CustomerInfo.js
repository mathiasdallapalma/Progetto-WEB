import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import FocusTrap from 'focus-trap-react';
import { FaTimes } from 'react-icons/fa';
import './CustomerInfo.css';

const apiProxy = 'http://localhost:4000';

const CustomerInfo = ({ code, onClose }) => {
  const [customerInfo, setCustomerInfo] = useState({});

  console.log("code in component "+code)

  useEffect(() => { //questo non si ferma
    fetchCustomerInfo();
  }, []);

  const fetchCustomerInfo = async () => {
    try {
      const response = await (axios.get(`${apiProxy}/customers/${code}`, { headers: { Authorization: Cookies.get('auth_token') } }))
      console.log("response:", response.data)
      const data = response.data
      const cleanedData = {
        CUST_CODE: data.CUST_CODE.trim(),
        CUST_NAME: data.CUST_NAME.trim(),
        CUST_CITY: data.CUST_CITY.trim(),
        WORKING_AREA: data.WORKING_AREA.trim(),
        CUST_COUNTRY: data.CUST_COUNTRY.trim(),
        GRADE: data.GRADE.trim(),
        OPENING_AMT: data.OPENING_AMT.trim(),
        RECEIVE_AMT: data.RECEIVE_AMT.trim(),
        PAYMENT_AMT: data.PAYMENT_AMT.trim(),
        OUTSTANDING_AMT: data.OUTSTANDING_AMT.trim(),
        PHONE_NO: data.PHONE_NO.trim(),
        AGENT_CODE: data.AGENT_CODE.trim()
      }

      setCustomerInfo(cleanedData)
    } catch (error) {
      console.error("Error customer info", error)
    }
  }


  /*return (
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
  );*/
  return (
      <FocusTrap focusTrapOptions={{ initialFocus: false }}>
        <div className="popup" role="alert" aria-relevant="all" aria-label="Customer info window">
          <div className="popup-content">
            <button
              className="close-button"
              onClick={onClose}
              role="button"
              aria-label="Close customer info window"
              tabIndex="1"
            >
              <FaTimes aria-hidden="true" />
            </button>
            <h3 id="customer-info-heading">Customer Information</h3>
            <p aria-labelledby="customer-code-label customer-code" tabIndex="0">
              <strong id="customer-code-label">Code: </strong>
              <span id="customer-code">{customerInfo.CUST_CODE}</span>
            </p>
            <p aria-labelledby="customer-name-label customer-name" tabIndex="0">
              <strong id="customer-name-label">Name: </strong>
              <span id="customer-name">{customerInfo.CUST_NAME}</span>
            </p>
            <p aria-labelledby="customer-area-label customer-area" tabIndex="0">
              <strong id="customer-area-label">Area: </strong>
              <span id="customer-area">{customerInfo.WORKING_AREA}</span>
            </p>
            <p aria-labelledby="customer-country-label customer-country" tabIndex="0">
              <strong id="customer-country-label">Country: </strong>
              <span id="customer-country">{customerInfo.CUST_COUNTRY}</span>
            </p>
            <p aria-labelledby="customer-grade-label customer-grade" tabIndex="0">
              <strong id="customer-grade-label">Grade: </strong>
              <span id="customer-grade">{customerInfo.GRADE}</span>
            </p>
            <p aria-labelledby="customer-opening-amt-label customer-opening-amt" tabIndex="0">
              <strong id="customer-opening-amt-label">Opening AMT: </strong>
              <span id="customer-opening-amt">{customerInfo.OPENING_AMT}</span>
            </p>
            <p aria-labelledby="customer-receive-amt-label customer-receive-amt" tabIndex="0">
              <strong id="customer-receive-amt-label">Receive AMT: </strong>
              <span id="customer-receive-amt">{customerInfo.RECEIVE_AMT}</span>
            </p>
            <p aria-labelledby="customer-payment-amt-label customer-payment-amt" tabIndex="0">
              <strong id="customer-payment-amt-label">Payment AMT: </strong>
              <span id="customer-payment-amt">{customerInfo.PAYMENT_AMT}</span>
            </p>
            <p aria-labelledby="customer-outstanding-amt-label customer-outstanding-amt" tabIndex="0">
              <strong id="customer-outstanding-amt-label">Outstanding AMT: </strong>
              <span id="customer-outstanding-amt">{customerInfo.OUTSTANDING_AMT}</span>
            </p>
            <p aria-labelledby="customer-phone-label customer-phone" tabIndex="0">
              <strong id="customer-phone-label">Phone: </strong>
              <span id="customer-phone">{customerInfo.PHONE_NO}</span>
            </p>
            <p aria-labelledby="customer-agent-code-label customer-agent-code" tabIndex="0">
              <strong id="customer-agent-code-label">Agent Code: </strong>
              <span id="customer-agent-code">{customerInfo.AGENT_CODE}</span>
            </p>
          </div>
        </div>
      </FocusTrap>
    );
};

export default CustomerInfo;