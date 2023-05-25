import React, { useEffect } from 'react'
import axios from "axios"

import "./LatestProducts.css"
import ProductCard from "../ProductCard/ProductCard"
import { useState } from 'react';
import { Link } from "react-router-dom"
const API_URL = "http://localhost:5005";

function LatestProducts() {

  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(response => {
        setLatestProducts(response.data)
      })
      .catch(err => console.log(err))
      
  }, [])

  return (
    <div className="latestProductsDiv">

      {latestProducts.slice(0, 10).map(product => {
        return (
          <ProductCard key={product._id} product={product} />
        )
      })}

    </div>
  )
}

export default LatestProducts;