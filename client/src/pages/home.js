import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import { useGetUserRole } from "../hooks/useGetUserRole";
import axios from "axios";
import Cookies from 'js-cookie';
import '../styles/home.css';
import Table from "../components/table";
import OrderAddPopup from "../components/orderAdd";

import AddCircleIcon from '@mui/icons-material/AddCircle';

const apiProxy = 'http://localhost:4000';
//const apiProxy = 'https://puppeteer-render-hb03.onrender.com';


export const Home = () => {

  //const userID = useGetUserID();
  //const role = useGetUserRole();
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;
  //console.log('utente loggato: ', userID);
  if (!user.userID) {
    console.log('not logged in');
    window.location.href = '/login';
  }

  const [addTriggered, setAddTriggered] = useState(false);

  const handleAdd = () => {
    setAddTriggered(true)

  }

  const handleSave = () => {
    console.log("saved");
    //TODO aggiungere/copiare dal main logica
    setAddTriggered(false);
  }
  const handleClose = () => {
    console.log("closing");
    //TODO aggiungere/copiare dal main logica
    setAddTriggered(false);
  }

  return (

    <div aria-label="Homepage" className="Home">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <h1>HOME</h1>
      <button className="add-button" onClick={() => handleAdd()} role="button" aria-label="Button to add a new order" tabindex="0">
        <AddCircleIcon className="add-icon" />
        <p className="button-text">Aggiungi</p>
      </button>
      <h1 aria-label="The username you logged in as">{user.userID}</h1>
      <h1 aria-label="The role this account has">{user.role}</h1>
      <Table userID={user.userID} role={user.role} />




      {addTriggered && (
        <div>
          <OrderAddPopup onSave={handleSave} onClose={handleClose} />
        </div>
      )}


    </div>
  );
};