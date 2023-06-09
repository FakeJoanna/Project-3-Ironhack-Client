import "./ProductCard.css"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { LanguageContext } from "../../context/lang.context"

function ProductCard({product}) {

    const { language } = useContext(LanguageContext)

    // shorterns description/title to avoid text overflow on the cards
    let title = product.title.split(" ")
    if(title.length > 5) {
        title = title.slice(0, 5).join(" ") + "..."
    }
    else {
        title = title.join(" ")
    }

    let description = product.description.split(" ")
    if(description.length > 10) {
        description = description.slice(0, 10).join(" ") + "..."
    }
    else {
        description = description.join(" ")
    }
    
    return (
        <div className="centeringDiv">

            <div className="productCardDiv">
                
                    <div className="productCard">
                        <Link to={`/member/${product.user[0]._id}`} className="productCardLink">
                            <div className="productCardHeader">
                                <img src={product.user[0].profilePicture} alt="" className="productCardHeaderPFP" />
                                <p className="productCardHeaderUsername">{product.user[0].name}</p>
                            </div>
                        </Link>

                        <Link to={`/products/${product._id}`} className="productCardLink">
                            <div className="productCardImageDiv">
                                <img src={product.img[0]} alt="" className="productCardImage" />
                            </div>

                            <div className="productCardInfoDiv">
                               { language === "EN" &&  <p className="priceProduct">${product.price}</p>}
                               { language === "FR" &&  <p className="priceProduct">€{product.price}</p>}
                               { language === "ES" &&  <p className="priceProduct">€{product.price}</p>}
                                <p className="descriptionProduct">{product.title}</p>
                                <p className="descriptionProduct">{product.size}</p>
                                <p className="descriptionProduct">{product.brand}</p>
                            </div>
                        </Link>  
                    </div>
            </div>
        </div>
       
        


    )
}

export default ProductCard