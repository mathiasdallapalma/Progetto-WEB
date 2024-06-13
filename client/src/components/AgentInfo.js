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
    <div className="popup" role="alert" aria-relevant="all" aria-label="Agent info window">
          <div className="popup-content">
            <button className="close-button" onClick={onClose} role="button" aria-roledescription="exit button" tabindex="1" >&times;</button>
            <h3>Agent Information</h3>
            <p aria-label="agent code" tabindex="0"><strong>Code:</strong> {agentInfo.AGENT_CODE}</p>
            <p aria-label="agent Name" tabindex="0"><strong>Name:</strong> {agentInfo.AGENT_NAME}</p>
            <p aria-label="agent Area" tabindex="0"><strong>Area:</strong> {agentInfo.WORKING_AREA}</p>
            <p aria-label="agent Commission" tabindex="0"><strong>Commission:</strong> {agentInfo.COMMISSION}</p>
            <p aria-label="agent Phone" tabindex="0"><strong>Phone:</strong> {agentInfo.PHONE_NO}</p>
          </div>
        </div>
  )
};

export default AgentInfo;