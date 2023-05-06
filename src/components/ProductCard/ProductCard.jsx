import React from 'react'

import "./ProductCard.css"

import { Link } from "react-router-dom";

function ProductCard({product, user}) {

  console.log(product)

  return (
    <>
    <Link to={`/products/${product._id}`}>
      <div class="container page-wrapper">
        <div class="page-inner">
          <div class="row">
            <div class="el-wrapper">
              <div class="box-up">
                <img class="img" src={product.img} alt=""/>
                <div class="img-info">
                  <div class="info-inner">

                    <span class="p-name">{product.title}</span>
                    <span class="p-company">{console.log(product)}</span>
                    <span class="p-company">{product.price}</span>

                  </div>
                  <div class="a-size">Description : <span class="size">{product.description}</span></div>
                </div>
              </div>
                <div class="box-down-container">
                  <div class="box-down">
                    <span class="add-to-cart">
                      <a href="">Add in cart</a>
                    </span>
                  </div>
                  <div class="box-down">
                    <div class="h-bg">
                      <div class="h-bg-inner"></div>
                    </div>
                    
                    <a href="">Make an offer</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ProductCard