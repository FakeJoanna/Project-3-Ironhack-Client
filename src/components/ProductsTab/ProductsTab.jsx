import "./ProductsTab.css"

import { useContext } from "react"
import { LanguageContext } from "../../context/lang.context" 
import ProductCard from "../ProductCard/ProductCard"

function ProductsTab({products}) {

    const { language } = useContext(LanguageContext)

    return ( 
        <div className="productsTabDiv">
            {products
                
            ? 
            
            products.map(product => {
                return(                  
                    <ProductCard key={product._id} product={product}/>
                )
            })           

            :

            <div className="noProductsDiv">
                <img src="https://cdn-icons-png.flaticon.com/512/864/864605.png" alt="" />
                {language === "EN" && <p>This member has no products for sale</p>}
                {language === "FR" && <p>Cet utilisateur ne vend pas de produits</p>}
                {language === "ES" && <p>Este usuario no tiene productos a la venta</p>}
            </div>    
                
            }
        </div>
    )
}

export default ProductsTab