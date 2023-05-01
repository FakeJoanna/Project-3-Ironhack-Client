import React from 'react'

import "./ProductCard.css"

function ProductCard() {
  return (
    <div className="card">
      <div className="cardImageWrapper">
        <img className="cardImage" src="https://images1.vinted.net/t/03_00a9b_3Sa9dujA69VGiynsbzZKNtNW/f800/1682955880.jpeg?s=a677955a532d78cc37e615ceeb87d5e10d729191" alt="" />
      </div>
      <div className="cardText">
        <h5>Price</h5>
        <h6>Brand</h6>
      </div>  
    </div>
  )
}

export default ProductCard