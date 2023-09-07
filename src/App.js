import './App.css';
import React, { useState, useEffect } from "react";
import Home from './Home.js'
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import ProductPage from './ProductPage';
import ShoppingCartPage from './ShoppingCartPage';
import OrderPage from './OrderPage';

function App() {
  const [session, setSession] = useState(null)

    const baseurl = 'https://individualproject-azure-app.azurewebsites.net/api/session'
     
  
    const fetchSession = () => {
      axios.get(baseurl)
      .then((response) => {
        console.log("response: ", response.data)
        setSession(response.data)
      })
    }

  
    useEffect(() => {
      fetchSession()
    },[])

  

  return (
    <p>Hello there</p>
    
  );
}

export default App;
