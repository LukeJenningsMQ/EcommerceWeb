import React, { useState } from "react";

const AddShoppingCart = ({updateFn}) => {
    const [quantity, setQuantity] = useState(1);
    const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hey there luke")
    updateFn(quantity)
    setIsButtonPressed(true)
  };
  
    return (
    <div className="shopForm">
    <h1>Ready To Buy?</h1>
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Add to Cart</button>
    </form>
    {isButtonPressed && <p>Item Added To Cart</p>}
    </div>
    )
}

export default AddShoppingCart