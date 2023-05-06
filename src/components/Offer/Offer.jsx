import "./Offer.css"

import { useState } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";
 
const API_URL = "http://localhost:5005";


function Offer() {

    const storedToken = localStorage.getItem("authToken");
    
    const { productId } = useParams()

        const [offer, setOffer] = useState({
            price: 0,
            message: ""
        })


        const handleChange = (event) => {
            const {name, value} = event.target
            setOffer(prevState => ({...prevState, [name]: value}))
        }


        const handleSubmit = (e) => {
            e.preventDefault()

            axios.post(`${API_URL}/api/products/${productId}/offer`, offer, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                console.log(response)
                console.log("success")
            })

            
        }

      return (

          <div>

             <form className="offerForm" onSubmit={handleSubmit}>

               <h1>Make an Offer</h1>

                 <input name="price" type="number" alt="" onChange={handleChange}></input>
                 <textarea name="message" type="text" onChange={handleChange}></textarea>

                 <button type="submit">Send offer</button>
            </form>

        </div>
    )
    }

    export default Offer