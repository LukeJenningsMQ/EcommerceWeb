import React from "react";
import {Link} from "react-router-dom"

const ProductCard = ({product}) => {

    console.log(product)

  return (
    <div className="productContainer">
      <Link style={{ textDecoration: 'none' }} to={'/' + product.id}>
      <img className="productImage" src={product.image} alt={product.body}></img>
      <div className="productTitle">{product.title}</div>
      </Link>
    </div>
    
    
  )

}

export default ProductCard