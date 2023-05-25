import { createContext, useState, useEffect } from "react";

import axios from "axios"

const CartContext = createContext([])

const API_URL = "http://localhost:5005"

function CartProviderWrapper(props) {
    const [cart, setCart] = useState([])

    useEffect(
        function loadCartOnSessionStart() {
          axios.post(`${API_URL}/api/cart`, getCart())
            .then(response => setCart(response.data))
            .catch(err => console.log(err))
        },
        []
    )

    function getCart() {
        const items = localStorage.getItem("cart")
        if(items) {
            return JSON.parse(items)
        }
        return []
    }
    
    function addToCart(productId) {
        axios.get(`${API_URL}/api/products/${productId}`)
            .then(response => setCart(prevState => [...prevState, response.data]))
            .catch(err => console.log(err))

        const items = getCart()
        items.push(productId)
        localStorage.setItem("cart", JSON.stringify(items))
    }
    
    function removeFromCart(productId) {
        const newCart = cart.filter(item => item._id !== productId)
        setCart(newCart)

        let items = getCart()
        items = items.filter(id => id !== productId)
        localStorage.setItem("cart", JSON.stringify(items))
    }
    
    return(
        <CartContext.Provider value={{cart, getCart, addToCart, removeFromCart}}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartProviderWrapper, CartContext }