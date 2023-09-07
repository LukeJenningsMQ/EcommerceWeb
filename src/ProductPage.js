import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import AddShoppingCart from './AddShoppingCart';

const ProductPage = ({uInfo}) => {

    const [productDisplayed, setProductDisplayed] = useState([])

    const baseurl = '/api/products/' + useParams().id 
  
    const [cartItems, setItems] = useState([])

    const Carturl = '/api/cart'
  
    const addNewItem = (q) => {
      const newItem = { user_id: uInfo.id, product_id: productDisplayed.id,name: productDisplayed.title, quantity: q, price: productDisplayed.price, total: q * productDisplayed.price};
      axios.post(Carturl, newItem)
      .then(response => {
        console.log("POST response", response)
        setItems([...cartItems, response.data])
      })
    }
  
    const fetchCart = () => {
      axios.get(Carturl)
      .then((response) => {
        console.log("response: ", response)
        setItems(response.data)
      })
    }
  
    const fetchProduct = () => {
      axios.get(baseurl)
      .then((response) => {
        console.log("response: ", response)
        setProductDisplayed(response.data)
      })
    }
  
    useEffect(() => {
      fetchProduct()
      fetchCart()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
   
    return (
        <div className='productPageDisplay'>
            <div className="leftCol"> 
                <div className="productTitle">{productDisplayed.title}</div>
                <img className="PageImage" src={productDisplayed.image} alt={productDisplayed.body}></img>
                <AddShoppingCart updateFn={addNewItem}></AddShoppingCart>
            </div>
            <div className="rightCol">
                    <div className='priceTag'>
                        <h1>Price: {productDisplayed.price}</h1>
                    </div>
                    
                    <h2>Details:</h2><p> {productDisplayed.body}</p>
                    <h2>Vendor:</h2> <p>{productDisplayed.vendor}</p>
                    <h2>Category:</h2> <p>{productDisplayed.category}</p>
                    <h2>Inventory:</h2> <p>{productDisplayed.inventory}</p>
                    <h2>Tags:</h2> <p>{productDisplayed?.tags?.join(', ')}</p>
                </div>
        </div>
    );

}

export default ProductPage