import "./MenProducts.css" 

import { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "../../components/ProductCard/ProductCard";

const API_URL = "http://localhost:5005";


function MenProducts() {

  const [products, setProducts] = useState([])


  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
    .then(response => {                 
      const menProducts = response.data.filter(product => product.category === "Men");
      setProducts(menProducts)
    })

    .catch(err => console.log(err))
  }, [])

  return (
    <div className="menProductsPageDiv">
      <div className="menProductsWrapper">

        <h1>For Men</h1>
        <div className="menProductsDiv"> 
            {products.map(product => {
                return (
                    <ProductCard key={product._id} product={product}/>
                )
            })}
        </div>
      </div>
    </div>

  )
}

export default MenProducts