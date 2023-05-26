import "./FavoriteProducts.css";
import axios from "axios";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { LanguageContext } from "../../context/lang.context" 

import ProductCard from "../../components/ProductCard/ProductCard";

const API_URL =  process.env.REACT_APP_API_URL; 

function FavoriteProducts() {
  
  const { user } = useContext(AuthContext)
  const [likedProducts, setLikedProducts] = useState([])
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    if(!user) {
      return
    }

    axios.post(`${API_URL}/api/all-likes`, { user })
    .then(response => {
      setLikedProducts(response.data.products)
    })
    .catch(err => console.log(err))
    
  }, [user])


  return (
    <div className="favouritesPageDiv">
      <div className="favouritesWrapper">
      
        {language === "EN" && <h1>WishList ❤️</h1>}
        {language === "FR" && <h1>Favoris ❤️</h1>}
        {language === "ES" && <h1>Favoritos ❤️</h1>}
       {language === "EN" && <div className="favouritesDiv">
          {likedProducts.length !== 0
          
          ? 
          
          likedProducts.map(product => {
            return (
                
              <ProductCard key={product._id} product={product} />
                
            )
          })
            
          :

          <p className="emptyWishlistText">Your wishlist is empty!</p>

          }
        </div>}
       {language === "FR" && <div className="favouritesDiv">
          {likedProducts.length !== 0
          
          ? 
          
          likedProducts.map(product => {
            return (
                
              <ProductCard key={product._id} product={product} />
                
            )
          })
            
          :

          <p className="emptyWishlistText">Vous n'avez pas d'articles en favoris</p>

          }
        </div>}
       {language === "ES" && <div className="favouritesDiv">
          {likedProducts.length !== 0
          
          ? 
          
          likedProducts.map(product => {
            return (
                
              <ProductCard key={product._id} product={product} />
                
            )
          })
            
          :

          <p className="emptyWishlistText">¡Tu lista de favoritos esta vacía!</p>

          }
        </div>}
      </div>
    </div>
  )
}

export default FavoriteProducts;