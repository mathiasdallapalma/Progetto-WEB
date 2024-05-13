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
      

      Cookies.set("auth_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

