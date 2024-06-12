import React from 'react';

const AgentInfo = ({ agentInfo, onClose }) => {
  if (!agentInfo) return null;

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
    <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={onClose}>&times;</button>
            <h3>Agent Information</h3>
            <p><strong>Code:</strong> {agentInfo.AGENT_CODE}</p>
            <p><strong>Name:</strong> {agentInfo.AGENT_NAME}</p>
            <p><strong>Area:</strong> {agentInfo.WORKING_AREA}</p>
            <p><strong>Commission:</strong> {agentInfo.COMMISSION}</p>
            <p><strong>Phone:</strong> {agentInfo.PHONE_NO}</p>
          </div>
        </div>
  )
};

export default AgentInfo;