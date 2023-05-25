import "./YouMightAlsoLike.css"

import React, { useEffect } from 'react'
import axios from "axios"

import "../LatestProducts/LatestProducts.css"
import ProductCard from "../ProductCard/ProductCard"
import { useState } from 'react';

const API_URL = "http://localhost:5005";

function YouMightAlsoLike() {

  const [youMightAlsoLike, setYouMightAlsoLike] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
    .then(response => {setYouMightAlsoLike(response.data)})
    .catch(err => console.log(err))
  }, [])


  return (      
    <div className="youMightAlsoLike">
      {youMightAlsoLike.map(product => {
        return(
          <ProductCard key={product._id} product={product} />
        )
      })}
    </div>
  )
}

export default YouMightAlsoLike;