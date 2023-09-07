import './App.css';
import React, { useState } from "react";
import axios from 'axios'

const CartItem = ({Item,updateFN}) => {
    const baseurl = '/api/cart/' + Item.id 
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [quantity, setQuantity] = useState(Item.quantity);
    const updateQ = (e) => {
        e.preventDefault();
        setIsButtonPressed(true)
      };
      const deleteQ = (e) => {
        e.preventDefault();
        axios.delete(baseurl)
         .then(response => {
            console.log('Success:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        updateFN()
      };

    const ConfirmQ = (e) => {
        e.preventDefault();
        axios.put(baseurl, {quantity: quantity})
         .then(response => {
            console.log('Success:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        updateFN()
        setIsButtonPressed(false)
    };




    return (
        <div className="shoppingCart">
        <div className="cartItem">
                <span className="itemName">{Item.name}</span>
                <span className="itemCost"> ${Item.total}</span>
                {!isButtonPressed && <p>Quantity: {quantity}</p>}
                {!isButtonPressed && <button onClick={updateQ} className="updateItem">Update</button>}
                {isButtonPressed && 
                    <form onSubmit={ConfirmQ}>
                        <div>
                        <label>
                        Quantity: 
                        <input 
                        name="quantity"
                        type="number" 
                        min="1" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        </label>
                        </div>
                        <button type="submit">Confirm</button>
                    </form>}
                <button onClick={deleteQ} className="removeItem">Remove</button>
            </div>
            </div>
    );

}

export default CartItem