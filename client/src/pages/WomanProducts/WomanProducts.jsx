import "./WomanProducts.css" 

import { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "../../components/ProductCard/ProductCard";

const API_URL = "http://localhost:5005";


function WomanProducts() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/api/products`)
        .then(response => {              
            const womenProducts = response.data.filter(product => product.category === "Women");
            setProducts(womenProducts)
        
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <div className="womenProductsPageDiv">
            <div className="womenProductsWrapper">

                <h1>For Women</h1>
                <div className="womenProductsDiv"> 
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

export default WomanProducts