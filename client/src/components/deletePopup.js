import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './popup.css';

import CloseIcon from '@mui/icons-material/Close';

const DeletePopup = ({ onSave, onClose }) => {

  return (
    <div className="popup">

      <div className="popup-content">

        <h1>R U SUREe??!</h1>
        <div className="form-actions">
          <button type="submit" className="btn btn-save" onClick={onSave}>Save</button>
          <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;