import "./Checkout.css"

import CheckoutInfo from "../../components/CheckoutInfo/CheckoutInfo"
import { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"

const API_URL = "http://localhost:5005";

function Checkout() {
    
    const storedToken = localStorage.getItem("authToken")
    const navigate = useNavigate()
    const { productId } = useParams()
    const [product, setProduct] = useState(null)

    //UseEffect to get the product details once the params is not null
    useEffect(() => {
        if(!productId) {
            return
        }

        axios.get(`${API_URL}/api/checkout/${productId}`,  { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
            setProduct(response.data)
        })
        .catch(err => console.log(err))

    }, [productId])

    const buttonRef = useRef(null)
    const wiperRef = useRef(null)
    const billingWipe = useRef(null)
    const paymentTerminalRef = useRef(null)
    const dimmerDivRef = useRef(null)
    const orderPlacedDivRef = useRef(null)

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
        orderPlacedDivRef.current.classList.add("scaleUp")
        setTimeout(() => {
            navigate("/")
        }, 2000);
    }

    return(
        <div className="checkoutPageDiv">

            <div className="checkoutWrapper">

                <div className="checkoutDetails">

                    <div ref={billingWipe} className="checkoutDetailsWrapper">
                        <h3>Billing information</h3>
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
                        <h3>Shipping information</h3>
                        <CheckoutInfo info={shippingInfo} setInfo={setShippingInfo}/>
                    </div>
                
                    <div ref={paymentTerminalRef} className="paymentTerminal">

                        <h3>Payment details</h3>
                        <div className="paymentTerminalWrapper">

                            <div className="checkoutGrouper">
                                <div className="checkoutInfoDiv">
                                    <label className="checkoutLabel">Name on card</label>
                                    <input className="checkoutInput" type="text" name="nameOnCard" placeholder="JOHN DOE"/>
                                </div>
                            </div>

                            <div className="checkoutGrouper">
                                <div className="checkoutInfoDiv">
                                    <label className="checkoutLabel">Card number</label>
                                    <input className="checkoutInput" type="number" name="nameOnCard" placeholder="XXXX - XXXX - XXXX - XXXX"/>
                                </div>
                            </div>

                            <div className="checkoutGrouper">
                                <div className="checkoutInfoDiv">
                                    <label className="checkoutLabel">Expiration date</label>
                                    <input className="checkoutInput" type="number" name="nameOnCard" placeholder="XX / XX"/>
                                </div>

                                <div className="checkoutInfoDiv">
                                    <label className="checkoutLabel">Security code</label>
                                    <input className="checkoutInput" type="number" name="nameOnCard" placeholder="XXX"/>
                                </div>
                            </div>

                            <button className="placeOrderButton" onClick={placeOrder}>Place Order</button>

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
                <p>Your order has been placed!</p>
            </div>

            <div ref={dimmerDivRef} className="dimmerDiv"></div>
        </div>
    )
}

export default Checkout

