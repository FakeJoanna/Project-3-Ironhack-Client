import "./ProductListPage.css" 
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { LanguageContext } from "../../context/lang.context";
 
import ProductCard from "../../components/ProductCard/ProductCard";

const API_URL =  process.env.REACT_APP_API_URL;

function ProductsListPage() {

    const [products, setProducts] = useState([])

    const { language } = useContext(LanguageContext)

    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios.get(`${API_URL}/api/products`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => setProducts(response.data))
            .catch(err => console.log(err))
    }, [])


    return (
       
        <div className="productsListDiv">

            <div className="productsListWrapper">

                {language === "EN" && <h2 className="allProductsTitle">All products</h2>}
                {language === "FR" && <h2 className="allProductsTitle">Tous les produits</h2>}
                {language === "ES" && <h2 className="allProductsTitle">Todos los productos</h2>}
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