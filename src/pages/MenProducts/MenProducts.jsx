import "./MenProducts.css" 

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../../context/lang.context" 

import ProductCard from "../../components/ProductCard/ProductCard";

const API_URL =  process.env.REACT_APP_API_URL;


function MenProducts() {

  const [products, setProducts] = useState([])
  const { language } = useContext(LanguageContext)


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

        {language === "EN" && <h1>For Men</h1>}
        {language === "FR" && <h1>Pour Hommes</h1>}
        {language === "ES" && <h1>Para Hombres</h1>}
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