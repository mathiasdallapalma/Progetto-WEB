import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './popup.css';

import CloseIcon from '@mui/icons-material/Close';

const DeletePopup = ({ onSave, onClose }) => {

  return (
    <div className="popup" role="alert" aria-relevant="all" aria-label="Delete confirmation window">

      <div className="popup-content">

        <h1 aira-label="Are you sure?">Are you SURE??!</h1>
        <div className="form-actions" aria-role="form">
          <button type="submit" className="btn btn-save" onClick={onSave} role="button" aria-roledescription="save button" 
          tabindex="0" aria-label="Yes delete the record">Save</button>
          <button type="button" className="btn btn-cancel" onClick={onClose} role="button" aria-roledescription="exit button" 
          tabindex="0" aria-label="No, do not delete the record">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;