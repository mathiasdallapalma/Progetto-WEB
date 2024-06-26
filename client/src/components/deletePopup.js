import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FocusTrap from 'focus-trap-react';
import './popup.css';

import CloseIcon from '@mui/icons-material/Close';

const DeletePopup = ({ code, onSave, onClose }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(code);
  };

  return (
   <FocusTrap focusTrapOptions={{ initialFocus: false }}>
    <div className="popup" role="alert" aria-relevant="all" aria-label="Delete confirmation window">
      <div className="popup-content">
        <laberl for="sure"><h1>Please confirm</h1></laberl>
        <form role="form" aria-label="Are you sure?" id="sure">
          <div className="form-actions">
            <button type="submit" className="btn btn-save" onClick={handleSubmit} role="button" aria-roledescription="save button" 
            tabindex="0" aria-label="Yes delete the record">Save</button>
            <button type="button" className="btn btn-cancel" onClick={onClose} role="button" aria-roledescription="exit button" 
            tabindex="0" aria-label="No, do not delete the record">Cancel</button>
          </div>
        </form>
      </div>
    </div>
   </FocusTrap>
  );
};

export default DeletePopup;