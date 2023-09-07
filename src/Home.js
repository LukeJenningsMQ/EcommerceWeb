import './App.css';
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.js"
import axios from 'axios'

const Home = () => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const baseurl = '/api/products'
  
  
    const fetchProducts = (urlUsed) => {
      axios.get(urlUsed)
      .then((response) => {
        console.log("response: ", response)
        setProducts(response.data)
      })
    }

    const fetchCategories = () => {
      const cateurl = '/api/categories'
      axios.get(cateurl)
      .then((response) => {
        console.log("response: ", response.data)
        setCategories(response.data)
      })
    }
  
    useEffect(() => {
      fetchProducts(baseurl)
      fetchCategories()
    },[])
    
    const handleSelectChange = (event) => {
      console.log(event.target.value)
      switch(event.target.value) {
        case 'All':
          return fetchProducts(baseurl)
        default:
          return fetchProducts('/api/products?category=' + event.target.value)
      }
    };
   
    return (
      <div>
        <div className='categorySelector'>
            <p>Choose Category to Display: </p>
            <select onChange={handleSelectChange}>
              <option key="All" value="All">All Products</option>
              {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>
              {value}
              </option>
            ))}
          </select>
        </div>
        <div className='productsDisplay'>
         {products.map((product) => (<ProductCard key={product.id} product={product}/>))}
        </div>
        </div>
    );

}

export default Home