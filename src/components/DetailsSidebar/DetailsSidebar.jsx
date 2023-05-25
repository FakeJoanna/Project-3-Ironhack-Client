import "./DetailsSidebar.css"

import { useParams, Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { CartContext } from "../../context/cart.context"
import Offer from "../Offer/Offer"
import axios from "axios";
const API_URL = "http://localhost:5005";



function DetailsSidebar({product, ownerUser}) {

    const { productId } = useParams()
    const { user } = useContext(AuthContext)
    const { addToCart } = useContext(CartContext)

    const [isLiked, setIsLiked] = useState(false)
    const [showOfferPopup, setShowOfferPopup] = useState(false);



    useEffect(() => {
        if(!user) {
            return
        }
        checkLike()
    }, [user])



    function checkLike() {
        axios.post(`${API_URL}/api/products/${productId}/like-check`, { user })
        .then((response) => {
            setIsLiked(response.data.likes)
        })
        .catch(err => console.log(err))
    }

    function handleLike() {
        axios.post(`${API_URL}/api/products/${productId}/like`, { user })
        .then(() => {
            setIsLiked(true)
        })
        .catch(err => console.log(err))
    }
  
    function handleUnlike() {
        axios.post(`${API_URL}/api/products/${productId}/unlike`, { user })
        .then(() => {
            setIsLiked(false)
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="detailsSidebarDiv">

            <h3 className="sidebarPrice">€{product.price}</h3>

            <hr />

            <div className="detailsDiv">

                <p className="details">
                    <span>Brand :</span>
                    <span><strong>{product.brand}</strong></span>
                </p>
                <p className="details">
                    <span>Size :</span>
                    <span><strong>{product.size}</strong></span>
                </p>
                <p className="details">
                    <span>State :</span>
                    <span><strong>{product.state}</strong></span>
                </p>
                <p className="details">
                    <span>Color :</span>
                    <span><strong>{product.color}</strong></span>
                </p>
                <p className="details">
                    <span>Country :</span>
                    <span><strong>{product.country}</strong></span>
                </p>
                <p className="details">
                    <span>Category :</span>
                    <span><strong>{product.category}</strong></span>
                </p>
            </div>

            <hr />

            <div className="sidebarDescriptionDiv">
                <p className="sidebarDescription">{product.description}</p>
            </div>

            <hr />

            <div className="creatorUserDiv">
                    <div className="sidebarProfilePicDiv">
                        <img className="sidebarProfilePic" src={ownerUser.profilePicture} alt=""/>
                    </div>
                    <div className="nameReviewDiv"> 
                        <h1 className="sidebarName">{ownerUser.name}</h1>
                        <p className="sidebarReviews">{ownerUser.review.length === 0 ? "No reviews yet" : ownerUser.review.length.toString() + + " reviews" } ⭐️</p>
                    </div>
            </div>

            <hr />

            <div className="locationLastSeenDiv">
                <p>Country : France</p>
                <p>Last seen: 45 min ago..</p>
            </div>

            <hr className="lastDivider"/>

            <div className="sidebarButtonsDiv">
                <Link to={`/member/${ownerUser._id}`}>
                    <button className="sidebarButton">Profile</button>
                </Link>
                <button className="sidebarButtonGreen" onClick={() => setShowOfferPopup(true)}>Make an Offer</button>
                <button className="sidebarButtonGreen" onClick={() => addToCart(productId)}>Add to cart</button>
                <button className="sidebarButtonGreen" onClick={isLiked ? handleUnlike : handleLike}>{ isLiked ? "Remove from WishList ❤️" : "Add to WishList ❤️" }</button>
            </div>

            {showOfferPopup && (
                
                <Offer productOwner={product.user[0]} />
                
            )}
        </div>
    )
}

export default DetailsSidebar