import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import { useGetUserRole } from "../hooks/useGetUserRole";
import axios from "axios";
import Cookies from 'js-cookie';
import '../styles/home.css';
import Table from "../components/table";

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
    return (

        <div className="Home">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <h1>HOME</h1>
            <h1>{user.userID}</h1>
            <h1>{user.role}</h1>
            <Table userID={user.userID} role={user.role}/>
        </div>
    );
};