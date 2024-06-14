import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import Cookies from 'js-cookie';
import '../styles/home.css';
import Table from "../components/table";
import OrderAddPopup from "../components/orderAdd";

import AddCircleIcon from '@mui/icons-material/AddCircle';

const apiProxy = 'http://localhost:4000';
//const apiProxy = 'https://puppeteer-render-hb03.onrender.com';


export const Home = () => {

  const userID = useGetUserID();
  if (!userID) {
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

    <div className="Home">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

      <h1>HOME</h1>
      <button className="add-button" onClick={() => handleAdd()}>
        <AddCircleIcon className="add-icon" />
        <p className="button-text">Aggiungi</p>
      </button>
      <Table />
      {addTriggered && (
        <div>
          <OrderAddPopup onSave={handleSave} onClose={handleClose} />
        </div>
      )}


    </div>
  );
};