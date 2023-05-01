import React from 'react'

import "./LatestProducts.css"
import ProductCard from "../ProductCard/ProductCard"

function LatestProducts() {
  return (
    <>
        <h1>Latest Products</h1>
        <div className="latestProductsDiv">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </>
  )
}

export default LatestProducts;