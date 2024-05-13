import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import Cookies from 'js-cookie';
import '../styles/home.css';


import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const apiProxy = 'http://localhost:4000';
//const apiProxy = 'https://puppeteer-render-hb03.onrender.com';

export const Home = () => {

  const userID = useGetUserID();
  if (!userID) {
    console.log('not logged in');
    window.location.href = '/login';
  }

  useEffect(() => {
    const fetchTours = async () => {
      try {
        //chiamata dell api qua
        //const response = (await axios.get(apiProxy + '/api/v1/tours', { headers: { Authorization: Cookies.get('auth_token') } })).data;

        //setTours(response);
      } catch (err) {
        if (err.response.status == 401) {
          console.log('not logged in');
          window.location.href = '/login';
        }
        console.log(err);
      }
    };


    fetchTours();
  }, []);

    return (

        <div className="Home">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <h1>HOME</h1>

        
        </div>
    );
};