import "./AccesoriesProducts.css" 

import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { LanguageContext } from "../../context/lang.context"

import ProductCard from "../../components/ProductCard/ProductCard";

const API_URL =  process.env.REACT_APP_API_URL;


function AccesoriesProducts() {

    const [products, setProducts] = useState([])

    const { language } = useContext(LanguageContext) 

    useEffect(() => {
        axios.get(`${API_URL}/api/products`)
        .then(response => {              
            const accesoriesProducts = response.data.filter(product => product.category === "Accessories");
            setProducts(accesoriesProducts)
        
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <div className="womenProductsPageDiv">
            <div className="womenProductsWrapper">

                {language === "EN" && <h1>Accesories</h1>}
                {language === "FR" && <h1>Accesoires</h1>}
                {language === "ES" && <h1>Accesorios</h1>}
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

export default AccesoriesProducts