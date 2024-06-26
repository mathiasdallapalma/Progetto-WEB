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

  const handleSave = async (order) => {
    console.log('cliccato save');
    console.log('devo creare', order)
    order.AGENT_CODE = user.userID;
    console.log(order.AGENT_CODE)
    try {
        const response = await axios.post('http://localhost:4000/orders', order, {
            headers: { Authorization: `Bearer ${Cookies.get('auth_token')}`}
        });
        if (response.status === 201) {
            console.log('Ordine creato con successo')
            setAddTriggered(false)
        }
        else {
            console.log('Errore nella creazione dell ordine')
        }
    }
    catch (error) {
        console.error('Errore durante la richiesta', error)
    }
    //TODO aggiungere/copiare dal main logica
    window.location.reload();
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
      <h1 className="home-title">HOME</h1>
      <div className="user-info">
        <h1 aria-label="The username you logged in as">{user.userID}</h1>
        <h1 aria-label="The role this account has">{user.role}</h1>
      </div>
      {user.role === "agent" && (
        <button className="add-button" onClick={() => handleAdd()} role="button" aria-label="Button to add a new order" tabIndex="0">
          <AddCircleIcon className="add-icon" />
          <p className="button-text">Aggiungi</p>
        </button>
      )}
      <Table userID={user.userID} role={user.role} />
      {addTriggered && (
        <div>
          <OrderAddPopup onSave={handleSave} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};