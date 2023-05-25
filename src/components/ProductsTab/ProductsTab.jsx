import "./ProductsTab.css"

import ProductCard from "../ProductCard/ProductCard"

function ProductsTab({products}) {

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
                <p>This member has no products for sale</p>
            </div>    
                
            }
        </div>
    )
}




export default ProductsTab