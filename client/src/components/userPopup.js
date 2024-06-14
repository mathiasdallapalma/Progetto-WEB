import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './popup.css';

import CloseIcon from '@mui/icons-material/Close';

const UserInfoPopup = ({ code,onClose }) => {

  return (
    <div className="popup">
      
      <div className="popup-content">
        <CloseIcon className='close-icon' onClick={onClose}></CloseIcon>
      <h1>Hai cliccato {code}</h1> 
      </div>
    </div>
  );
};

export default UserInfoPopup;