import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios'
import CartItem from './CartItem';

const ShoppingCartPage = ({uInfo}) => {

    const [cart, setCart] = useState([])
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const baseurl = '/api/cart/' + uInfo.id
    const Orderurl = '/api/orders'

    const deleteAll = () => {
        cart.forEach((item) => {
            const deleteurl = '/api/cart/' + item.id
            axios.delete(deleteurl)
                .then(response => {
                console.log('Success:', response.data);
            })
                .catch(error => {
                console.error('Error:', error);
            })});
        fetchItems()
      };


    const fetchItems = () => {
            axios.get(baseurl)
            .then((response) => {
            console.log("response: ", response)
            setCart(response.data)
            })
    
    }


  
    useEffect(() => {
      fetchItems()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const calculateTotalPrice = () => {
        let totalPrice = cart.reduce((accum, currentItem) => {
          return accum + currentItem.total;
        }, 0);
    
        return totalPrice;
      };

  
    const addNewOrder = () => {
      const totalPrice = calculateTotalPrice();
      const orderItems = cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));
      const newOrder = { user_id: uInfo.id, order_items: orderItems, order_total: totalPrice};
      axios.post(Orderurl, newOrder)
      .then(response => {
        console.log("POST response", response)
      })
      .catch(error => {
        console.error("POST error", error);
      });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewOrder()
        setIsButtonPressed(true)
        deleteAll()
      };
   
    return (
        <div>
        <div className='SubmitOrder'>
        {!isButtonPressed && <form onSubmit={handleSubmit}>
      <div>
        <label>
          Order the Items inside Cart: 
        </label>
      </div>
      <button type="submit">Confirm Order</button>
    </form>}
    {isButtonPressed && <p>Order has been submitted</p>}
        </div>
        <div className='productsDisplay'>
         {cart.map((Item) => (<CartItem updateFN={fetchItems} key={Item.id} Item={Item}></CartItem>))}
        </div>
        </div>
    );

}

export default ShoppingCartPage