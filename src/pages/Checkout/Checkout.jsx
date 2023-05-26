import "./Checkout.css"

import axios from "axios"

import { useContext, useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { LanguageContext } from "../../context/lang.context" 

import CheckoutInfo from "../../components/CheckoutInfo/CheckoutInfo"

const API_URL =  process.env.REACT_APP_API_URL;

function Checkout() {
    
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { productId } = useParams()
    const [product, setProduct] = useState(null)
    const { language } = useContext(LanguageContext)

    const [isCheckoutByID, setIsCheckoutByID] = useState(null)
    const [reviewText, setReviewText] = useState("")

    //UseEffect to get the product details once the params is not null
    useEffect(() => {
        if(!productId) {
            return
        }

        axios.get(`${API_URL}/api/checkout/${productId}`)
        .then((response) => {
            setProduct(response.data)
            setIsCheckoutByID(true)
        })
        .catch(err => console.log(err))

    }, [productId])

    const buttonRef = useRef(null)
    const wiperRef = useRef(null)
    const billingWipe = useRef(null)
    const paymentTerminalRef = useRef(null)
    const dimmerDivRef = useRef(null)
    const orderPlacedDivRef = useRef(null)
    const submitReviewButtonRef = useRef(null)

    const [billingInfo, setBillingInfo] = useState({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        country: "",
        city: "",
        state: "",
    })

    const [shippingInfo, setShippingInfo] = useState({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        country: "",
        city: "",
        state: "",
    })

    ////////////////////

    function cloneAndSlide() {
        setShippingInfo(billingInfo)
        buttonRef.current.classList.add("rotate")
        setTimeout(() => {
            wiperRef.current.classList.add("wipe-away")
            setTimeout(() => {
                paymentTerminalRef.current.style.zIndex = "1"
                billingWipe.current.classList.add("wipe-away")
            }, 500);
        }, 800);
    }

    function placeOrder() {
        localStorage.setItem("cart", "[]")
        dimmerDivRef.current.classList.add("dimming")
        orderPlacedDivRef.current.style.justifyContent = "center"
        orderPlacedDivRef.current.classList.add("scaleUp")
        if(!isCheckoutByID) {
            setTimeout(() => {
                navigate("/")
            }, 2000);
        }
    }

    function handleReviewChange(e) {
        setReviewText(e.target.value)
    }

    function submitReview() {
        axios.post(`${API_URL}/api/create-review`, {reviewText, userReviewing: user._id, userReviewed: product.user[0]._id})
        .then(() => {
            submitReviewButtonRef.current.style.backgroundColor = "#2d8a51"
            submitReviewButtonRef.current.innerHTML = "Submitted!"
            setTimeout(() => {
                navigate("/")
            }, 2000);
        })
        .catch(err => console.log(err))
    }

    function toHomePage() {
        navigate("/")
    }

    return(
        <div className="checkoutPageDiv">

            <div className="checkoutWrapper">

                <div className="checkoutDetails">

                    <div ref={billingWipe} className="checkoutDetailsWrapper">
                       {language === "EN" && <h3>Billing information</h3>}
                       {language === "FR" && <h3>Facturation</h3>}
                       {language === "ES" && <h3>Billing information</h3>}
                        <CheckoutInfo info={billingInfo} setInfo={setBillingInfo}/>
                    </div>

                    <div ref={wiperRef} className="wiperDiv"></div>

                    <div className="interactiveCheckoutButtonDiv">
                        <button className="interactiveCheckoutButton">
                            <svg ref={buttonRef} className="arrowCheckout" viewBox="0 0 16 16" onClick={cloneAndSlide}>
                                <path d="M8 12L2 6h12z" transform="rotate(-90 8 8)"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="checkoutDetailsWrapper shippingWrapper">
                        {language === "EN" && <h3>Shipping information</h3>}
                        {language === "FR" && <h3>Information d'envoi</h3>}
                        {language === "ES" && <h3>Información de envío</h3>}
                        <CheckoutInfo info={shippingInfo} setInfo={setShippingInfo}/>
                    </div>
                
                    <div ref={paymentTerminalRef} className="paymentTerminal">

                        {language === "EN" && <h3>Payment details</h3>}
                        {language === "FR" && <h3>Details de paieme</h3>}
                        {language === "ES" && <h3>Detalles de pago</h3>}
                        <div className="paymentTerminalWrapper">

                            <div className="checkoutGrouper">
                                <div className="checkoutInfoDiv">
                                    {language === "EN" && <label className="checkoutLabel">Name on card</label>}
                                    {language === "FR" && <label className="checkoutLabel">Nom sur la carte</label>}
                                    {language === "ES" && <label className="checkoutLabel">Nombre en la tarjeta</label>}
                                    <input className="checkoutInput" type="text" name="nameOnCard" placeholder="JOHN DOE"/>                                  
                                </div>
                            </div>

                            <div className="checkoutGrouper">
                                <div className="checkoutInfoDiv">
                                    { language === "EN" && <label className="checkoutLabel">Card number</label>}
                                    { language === "FR" && <label className="checkoutLabel">Numero de carte</label>}
                                    { language === "ES" && <label className="checkoutLabel">Número de tarjet</label>}
                                    <input className="checkoutInput" type="number" name="nameOnCard" placeholder="XXXX - XXXX - XXXX - XXXX"/>
                                </div>
                            </div>

                            <div className="checkoutGrouper">
                                <div className="checkoutInfoDiv">
                                    {language === "EN" && <label className="checkoutLabel">Expiration date</label>}
                                    {language === "FR" && <label className="checkoutLabel">Date d'expiration</label>}
                                    {language === "ES" && <label className="checkoutLabel">Fecha de caducidad</label>}
                                    <input className="checkoutInput" type="number" name="nameOnCard" placeholder="XX / XX"/>
                                </div>

                                <div className="checkoutInfoDiv">
                                   {language === "EN" && <label className="checkoutLabel">Security code</label>}
                                   {language === "FR" && <label className="checkoutLabel">Code de securité</label>}
                                   {language === "ES" && <label className="checkoutLabel">Código de seguridad</label>}
                                    <input className="checkoutInput" type="number" name="nameOnCard" placeholder="XXX"/>
                                </div>
                            </div>

                           {language === "EN" && <button className="placeOrderButton" onClick={placeOrder}>Place Order</button>}
                           {language === "FR" && <button className="placeOrderButton" onClick={placeOrder}>Placer la commande</button>}
                           {language === "ES" && <button className="placeOrderButton" onClick={placeOrder}>Confirmar compra</button>}

                        </div>
                    </div>
                
                </div>

                {product && 

                <div className="checkoutProductDiv">
                    <div className="checkoutProductImagesDiv">
                        {product.img.map((image, index) => {
                            return(
                                <img key={index} className="checkoutProductImage" src={image} alt="" />
                            )
                        })}
                    </div>
                    <div className="checkoutProductInfo">
                        <div className="checkoutProductTitleAndPrice">
                            <div className="hackyDivider"></div>
                            <h6>{product.title}</h6>
                            <hr />
                            <h6>{product.description}</h6>
                        </div>
                    </div>
                </div>

                }
            </div>

            <div ref={orderPlacedDivRef} className="orderPlacedDiv">
               {language === "EN" && <p>Your order has been placed!</p>}
               {language === "FR" && <p>Votre commande à été recu avec succée</p>}
               {language === "ES" && <p>Has finalizado tu compra!</p>}
                {isCheckoutByID && 
                <>
                    <div className="orderPlaceDivider"></div>
                    <div className="leaveAReviewDiv">
                        {language === "EN" && <p>Would you like to leave a review?</p>}
                        {language === "FR" && <p>Souhaitez vous laisser un commentaire</p>}
                        {language === "ES" && <p>¿Te gustaría dejar una reseña?</p>}
                        
                        {language === "EN" && <textarea className="reviewTextArea" placeholder="Let the seller know what you think" onChange={handleReviewChange}></textarea>}
                        {language === "FR" && <textarea className="reviewTextArea" placeholder="Laisser un mot pour le vendeur" onChange={handleReviewChange}></textarea>}
                        {language === "ES" && <textarea className="reviewTextArea" placeholder="Dale al vendedor tu opinión honesta" onChange={handleReviewChange}></textarea>}
                        
                        {language === "EN" && <button ref={submitReviewButtonRef} className="submitReviewButton" onClick={submitReview}>Submit review</button>}
                        {language === "FR" && <button ref={submitReviewButtonRef} className="submitReviewButton" onClick={submitReview}>Envoyer le commentaire</button>}
                        {language === "ES" && <button ref={submitReviewButtonRef} className="submitReviewButton" onClick={submitReview}>Confirmar reseña</button>}

                        {language === "EN" && <button className="skipButton" onClick={toHomePage}>No, thank you</button>}
                        {language === "FR" && <button className="skipButton" onClick={toHomePage}>Non, merci</button>}
                        {language === "ES" && <button className="skipButton" onClick={toHomePage}>No, gracias</button>}
                    </div>
                </>
                } 
            </div>

            <div ref={dimmerDivRef} className="dimmerDiv"></div>
        </div>
    )
}

export default Checkout

