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
  const [userInfo, setUserInfo] = useState([])

    const baseurl = '/api/session'
     
  
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

    useEffect(() => {
      if (session !== null) {
        // This will only run if session is not null
        console.log("Updated session:", session);
        const userurl = '/api/users/' + session.user_id
        axios.get(userurl)
          .then((response) => {
          console.log("response: ", response.data)
          setUserInfo(response.data)
        })
      }
  }, [session])

  return (
    <Router>
      <div className="App">
        <header className="App-header">
      <div className='Banner'>
      <img className="Logo" src='WebLogo.png' alt='website logo'></img>
      </div>
      <nav>
      <ul className="Navigation">
        <Link style={{ textDecoration: 'none' }} to="/"><li>Home</li></Link>
        <Link style={{ textDecoration: 'none' }} to="/Cart"><li>Cart</li></Link>
        <Link style={{ textDecoration: 'none' }} to="/Orders"><li>Orders</li></Link>
        <li className='log'>{userInfo.first_name} {userInfo.last_name} logged In</li>
      </ul>
      </nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<ShoppingCartPage uInfo={userInfo}></ShoppingCartPage>} />
        <Route path="/Orders" element={<OrderPage uInfo={userInfo} />} />
        <Route path="/:id" element={<ProductPage uInfo={userInfo}/>} />
      </Routes>
      </header>
      <footer>
        <p>&copy; 2023 Luke Jennings. All rights reserved.</p>
      </footer>
      </div>
    </Router>
    
  );
}

export default App;
