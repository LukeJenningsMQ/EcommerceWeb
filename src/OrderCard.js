import React from "react";


const OrderCard = ({order}) => {


  return (
<div className="orderContainer">
  
  <div className="orderDetails">
  <h2>Order Details</h2>
    <p><strong>ID: </strong>{order.id}</p>
    <p><strong>Order Date: </strong>{order.order_date}</p>
    <p><strong>Order Status: </strong>{order.order_status}</p>
    <p><strong>Order Total: </strong>{order.order_total}</p>
  </div>
  
  <div className="orderItems">
    <h3>Items</h3>
    {order.order_items.map((item) =>
    <div key={item.product_id} className="item">
      <p><strong>Product ID: </strong>{item.product_id}</p>
      <p><strong>Quantity: </strong>{item.quantity}</p>
      <p><strong>Price: </strong>{item.price}</p>
    </div>
    )}
  </div>
</div>
    
    
  )

}

export default OrderCard