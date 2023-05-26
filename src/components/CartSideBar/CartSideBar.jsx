import "./CartSideBar.css"

import { useContext } from "react"
import { Link } from "react-router-dom"

import { CartContext } from "../../context/cart.context"
import { LanguageContext } from "../../context/lang.context"

function CartSideBar() {
    
    const { cart, removeFromCart } = useContext(CartContext)
    const { language } = useContext(LanguageContext)

    let cartTotal = 0
    cart.forEach(item => {
        cartTotal += item.price
    });

    return(
        <>
            <div className="cartTop">
                {language === "EN" && <h5 className="cartName">Your Shopping Cart</h5>}
                {language === "FR" && <h5 className="cartName">Votre panier</h5>}
                {language === "ES" && <h5 className="cartName">Tu carro de la compra</h5>}
                {language === "EN" && <h5>Your total is: {cartTotal}€</h5>}
                {language === "FR" && <h5>Votre total est : {cartTotal}€</h5>}
                {language === "ES" && <h5>Total: {cartTotal}€</h5>}
            </div>

            <div className="cartMainDiv">
                {cart.map(item => {
                    return(
                        <div key={item._id} className="cartItemDiv">
                            <img className="cartImage" src={item.img[0]} alt="" />
                            <div className="cartInfo">
                                <div className="cartTitleAndPrice">
                                    <div className="hackyDivider"></div>
                                    <h6>{item.title}</h6>
                                    <hr />
                                    <h6>{item.price}€</h6>
                                </div>
                                <div className="cartDelete">
                                    <button className="cartDeleteButton" onClick={() => removeFromCart(item._id)}>
                                        {language === "EN" && <p>Remove</p>}
                                        {language === "FR" && <p>Supprimer</p>}
                                        {language === "ES" && <p>Eliminar</p>}
                                    </button> 
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="checkoutDiv">
                <Link to="/checkout" >
                    <button className="checkoutButton">
                    {language === "EN" &&  <p>Checkout</p>}
                    {language === "FR" &&  <p>Payer</p>}
                    {language === "ES" &&  <p>Pagar</p>}
                    </button>
                </Link>
            </div>

        </>            
    )
}

export default CartSideBar