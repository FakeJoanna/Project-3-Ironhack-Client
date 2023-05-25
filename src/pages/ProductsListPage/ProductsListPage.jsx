import "./ProductListPage.css" 
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
import ProductCard from "../../components/ProductCard/ProductCard";

const API_URL = "http://localhost:5005";

function ProductsListPage() {

    const [products, setProducts] = useState([])

    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios.get(`${API_URL}/api/products`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => setProducts(response.data))
            .catch(err => console.log(err))
    }, [])


    return (
       
        <div className="productsListDiv">

            <div className="productsListWrapper">

                <h2 className="allProductsTitle">All products</h2>
                <hr className="hrDesign" />
            
                <div className="productsListGridDiv">
                    {products.map(product => {
                        return <ProductCard key={product._id} product={product} />
                        
                    })}
                </div>
            
            </div>
        </div>
    )
}

export default ProductsListPage