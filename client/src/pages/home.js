import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import Cookies from 'js-cookie';
import '../styles/home.css';
import Table from "../components/table";

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const apiProxy = 'http://localhost:4000';
//const apiProxy = 'https://puppeteer-render-hb03.onrender.com';

export const Home = () => {

  const userID = useGetUserID();
  //console.log('utente loggato: ', userID);
  if (!userID) {
    console.log('not logged in');
    window.location.href = '/login';
  }






    return (

        <div className="Home">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <h1>HOME</h1>
            <h1>{userID}</h1>
            <Table userID={userID} />
        </div>
    );
};