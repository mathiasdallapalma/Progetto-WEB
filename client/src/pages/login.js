import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import '../styles/login.css';


const apiProxy='http://localhost:4000';

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Stato per il messaggio di errore

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(apiProxy + '/api/v1/auth/login')


      const result = await axios.post(apiProxy + '/api/v1/auth/login', {
        username,
        password,
      }, {
        headers: {
          'Access-Control-Allow-Origin': 'https://locallhost.com/', // Sostituisci con l'origine effettiva
          'Content-Type': 'application/json', // Tipo di contenuto della richiesta
        }
      });

      // Controlla se l'autenticazione è fallita
      /*if (!result.data.success) {
        alert(result.data.message); // Mostra un messaggio di errore all'utente
        return; // Esci dalla funzione senza navigare alla home
      }*/

      if (result.data.success) {
        console.log("il token è: ", result.data.token);
        Cookies.set("auth_token", result.data.token);
        console.log("il ruolo è: ", result.data.role);
        window.localStorage.setItem("userID", result.data.userID);
        window.localStorage.setItem("role", result.data.role);
        navigate("/home", {state: {userID: result.data.userID, role: result.data.role } });
      }
      else {
        setUsername("");
        setPassword("");
        setErrorMessage(result.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div aria-label="Login page" className="auth-container">
      <form onSubmit={handleSubmit} role="form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input placeholder="your username" role="input" aria-required="true" tabindex="0" aria-selected="true"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input placeholder="your password" role="input" aria-required="true" tabindex="0" aria-selected="false"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {errorMessage && (
          <div className="error-message" role="alert" aria-relevant="all">
            {errorMessage}
          </div>
        )}
        <button role="button" aria-roledescription="submit button" type="submit" tabindex="0" aria-selected="false">Login</button>
      </form>
    </div>
  );
};

