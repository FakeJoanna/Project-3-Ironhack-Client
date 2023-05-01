 
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
const API_URL = "http://localhost:5005";

function ProductsListPage() {

    const [products, setProducts] = useState([])

    const getAllProducts = () => {
        axios.get(`${API_URL}/api/products`)
        .then(response => setProducts(response.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllProducts()
    }, [])


    return (
        <div> 
        
        {products.map(product => (

            <div key={product._id}> 
            
                <Link to={`/products/${product._id}`}>

                    <img src={product.img}/>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>

                </Link>

            </div>

        ))}
        
        </div>
    )
}

export default ProductsListPage