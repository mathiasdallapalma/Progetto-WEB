import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import FocusTrap from 'focus-trap-react';
import { FaTimes } from 'react-icons/fa';
import './AgentInfo.css';

const apiProxy = 'http://localhost:4000';

const AgentInfo = ({ code, onClose }) => {
  //if (!agentInfo) return null;
  const [agentInfo, setAgentInfo] = useState({})

  console.log('agent code in component', code)

  useEffect(() => {
    fetchAgentInfo();
  }, []);

  const fetchAgentInfo = async () => {
      try {
        const response = await (axios.get(`${apiProxy}/agents/${code}`, { headers: { Authorization: Cookies.get('auth_token') } }))
        console.log("response:", response.data)
        const data = response.data
        const cleanedData = {
          AGENT_CODE: data.AGENT_CODE.trim(),
          AGENT_NAME: data.AGENT_NAME.trim(),
          WORKING_AREA: data.WORKING_AREA.trim(),
          COMMISSION: data.COMMISSION.trim(),
          PHONE_NO: data.PHONE_NO.trim(),
        }

        setAgentInfo(cleanedData)
      } catch (error) {
        console.error("Error agent info", error)
      }
    }

  /*return (
    <div className="agent-info">
      <h3>Agent Information</h3>
      <p><strong>Code:</strong> {agentInfo.AGENT_CODE}</p>
      <p><strong>Name:</strong> {agentInfo.AGENT_NAME}</p>
      <p><strong>Phone:</strong> {agentInfo.PHONE_NO}</p>
      <p><strong>Area:</strong> {agentInfo.WORKING_AREA}</p>
      <p><strong>Commission:</strong> {agentInfo.COMMISSION}</p>
    </div>
  );
  */
  return (
    <FocusTrap focusTrapOptions={{ initialFocus: false }}>
      <div className="popup" role="alert" aria-relevant="all" aria-label="Agent info window">
        <div className="popup-content">
          <button
            className="close-button"
            onClick={onClose}
            role="button"
            aria-label="Close agent info window"
            tabIndex="1"
          >
            <FaTimes aria-hidden="true" />
          </button>
          <h3 id="agent-info-heading">Agent Information</h3>
          <p aria-labelledby="agent-code-label agent-code" tabIndex="0">
            <strong id="agent-code-label">Code:</strong>
            <span id="agent-code">{agentInfo.AGENT_CODE}</span>
          </p>
          <p aria-labelledby="agent-name-label agent-name" tabIndex="0">
            <strong id="agent-name-label">Name:</strong>
            <span id="agent-name">{agentInfo.AGENT_NAME}</span>
          </p>
          <p aria-labelledby="agent-area-label agent-area" tabIndex="0">
            <strong id="agent-area-label">Area:</strong>
            <span id="agent-area">{agentInfo.WORKING_AREA}</span>
          </p>
          <p aria-labelledby="agent-commission-label agent-commission" tabIndex="0">
            <strong id="agent-commission-label">Commission:</strong>
            <span id="agent-commission">{agentInfo.COMMISSION}</span>
          </p>
          <p aria-labelledby="agent-phone-label agent-phone" tabIndex="0">
            <strong id="agent-phone-label">Phone:</strong>
            <span id="agent-phone">{agentInfo.PHONE_NO}</span>
          </p>
        </div>
      </div>
    </FocusTrap>
  );
};

export default AgentInfo;