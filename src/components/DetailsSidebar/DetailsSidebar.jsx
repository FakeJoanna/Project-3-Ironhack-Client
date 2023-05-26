import "./DetailsSidebar.css"

import { useParams, Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { CartContext } from "../../context/cart.context"
import { LanguageContext } from "../../context/lang.context"

import Offer from "../Offer/Offer"
import axios from "axios";

const API_URL =  process.env.REACT_APP_API_URL

function DetailsSidebar({product, ownerUser}) {

    const { productId } = useParams()
    const { user } = useContext(AuthContext)
    const { addToCart } = useContext(CartContext)
    const { language } = useContext(LanguageContext)

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

            <h3 className="sidebarTitle">{product.title}</h3>

            <hr />

            <h4 className="sidebarPrice">€{product.price}</h4>

            <div className="detailsDiv">

                <p className="details">
                   {language === "EN" && <span>Brand:</span>}
                   {language === "FR" && <span>Marque:</span>}
                   {language === "ES" && <span>Marca:</span>}
                    <span><strong>{product.brand}</strong></span>
                </p>
                <p className="details">
                    { language === "EN" && <span>Size:</span>}
                    { language === "FR" && <span>Taille:</span>}
                    { language === "ES" && <span>Tamaño:</span>}
                    <span><strong>{product.size}</strong></span>
                </p>
                <p className="details">
                    {language === "EN" && <span>State: </span>}
                    {language === "FR" && <span>Etat: </span>}
                    {language === "ES" && <span>Estado: </span>}
                    <span><strong>{product.state}</strong></span>
                </p>
                <p className="details">
                    { language === "EN" && <span>Color: </span>}
                    { language === "FR" && <span>Couleur: </span>}
                    { language === "ES" && <span>Color: </span>}
                    <span><strong>{product.color}</strong></span>
                </p>
                <p className="details">
                    {language === "EN" && <span>Country: </span>}
                    {language === "FR" && <span>Pays: </span>}
                    {language === "ES" && <span>País: </span>}
                    <span><strong>{product.country}</strong></span>
                </p>
                <p className="details">
                   { language ==="EN" && <span>Category: </span>}
                   { language ==="FR" && <span>Categorie: </span>}
                   { language ==="ES" && <span>Categoría: </span>}
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
                    { language === "EN" && <button className="sidebarButton">Profile</button>}
                    { language === "FR" && <button className="sidebarButton">Profile</button>}
                    { language === "ES" && <button className="sidebarButton">Perfil</button>}
                </Link>
                
                { language === "EN"&& <button className="sidebarButtonGreen" onClick={() => setShowOfferPopup(true)}>Make an Offer</button>}
                { language === "FR"&& <button className="sidebarButtonGreen" onClick={() => setShowOfferPopup(true)}>Faire une offre</button>}
                { language === "ES" && <button className="sidebarButtonGreen" onClick={() => setShowOfferPopup(true)}>Hacer Oferta</button>}
                
                { language === "EN" && <button className="sidebarButtonGreen" onClick={() => addToCart(productId)}>Add to cart</button>}
                { language === "FR" && <button className="sidebarButtonGreen" onClick={() => addToCart(productId)}>Ajouter au panier</button>}
                { language === "ES" && <button className="sidebarButtonGreen" onClick={() => addToCart(productId)}>Añadir a la cesta</button>}
                
                { language === "EN" && <button className="sidebarButtonGreen" onClick={isLiked ? handleUnlike : handleLike}>{ isLiked ? "Remove from WishList ❤️" : "Add to WishList ❤️" }</button>}
                { language === "FR" && <button className="sidebarButtonGreen" onClick={isLiked ? handleUnlike : handleLike}>{ isLiked ? "Enlever des Favoris ❤️" : "Ajouter aux Favoris ❤️" }</button>}
                { language === "ES" && <button className="sidebarButtonGreen" onClick={isLiked ? handleUnlike : handleLike}>{ isLiked ? "Eliminar de Favoritos ❤️" : "Añadir a Favoritos ❤️" }</button>}
            </div>

            {showOfferPopup && (
                
                <Offer productOwner={product.user[0]} />
                
            )}
        </div>
    )
}

export default DetailsSidebar