import "./FavoriteProducts.css";
import axios from "axios";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import ProductCard from "../../components/ProductCard/ProductCard";

const API_URL = "http://localhost:5005"; 

function FavoriteProducts() {
  
  const { user } = useContext(AuthContext)
  const [likedProducts, setLikedProducts] = useState([])

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
      
        <h1>WishList ❤️</h1>
        <div className="favouritesDiv">
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
        </div>
      </div>
    </div>
  )
}

export default FavoriteProducts;