import React, { useEffect } from 'react'
import axios from "axios"

import "./LatestProducts.css"
import ProductCard from "../ProductCard/ProductCard"
import { useState } from 'react';

const API_URL = "http://localhost:5005";

function LatestProducts() {

  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    console.log("this is the useEffect requests")
    axios.get(`${API_URL}/api/products`)
      .then(response => {setLatestProducts(response.data)})
      .catch(err => console.log(err))
      
  }, [])


  return (
    <>
        <h1 className="latestProductsText">Latest Products</h1>
        <div className="latestProductsDiv">
          {latestProducts.map(product => {
            return(
              <ProductCard product={product} />

            )
          })}
        </div>
    </>
  )
}

export default LatestProducts;