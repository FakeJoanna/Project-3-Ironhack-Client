import "./Offer.css"

import { useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import { ChatIDsContext } from "../../context/chatIDs.context"
import { LanguageContext } from "../../context/lang.context"
 
const API_URL =  process.env.REACT_APP_API_URL


function Offer({ productOwner }) {

    const storedToken = localStorage.getItem("authToken");

    const { user } = useContext(AuthContext)
    const { setChatIDs, setOffer } = useContext(ChatIDsContext)
    const { language } = useContext(LanguageContext)
    
    const navigate = useNavigate()
    const { productId } = useParams()

    const [offerText, setOfferText] = useState({
      price: 0,
      message: "",
      productId: productId
    })


    function handleChange(e) {
      const {name, value} = e.target
      setOfferText(prevState => ({...prevState, [name]: value}))
    }

    function handleSubmit(e) {
      e.preventDefault()

      axios.post(`${API_URL}/api/products/${productId}/offer`, offerText, { headers: { Authorization: `Bearer ${storedToken}` } })

      setOffer(offerText)
      setChatIDs([user._id, productOwner._id])
      navigate("/message")
    }

    return (
        <div className="popupContainer">
          <form className="offerForm" onSubmit={handleSubmit}>
            {language === "EN" && <h1>Make an Offer</h1>}
            {language === "FR" && <h1>Faire une offre</h1>}
            {language === "ES" && <h1>Hacer Oferta</h1>}
            <input
              name="price"
              type="number"
              alt=""
              onChange={handleChange}
            ></input>
            
            { language === "EN" && <button type="submit">Send offer</button>}
            { language === "FR" && <button type="submit">Envoyer l'of</button>}
            { language === "ES" && <button type="submit">Enviar oferta</button>}
          </form>
        </div>
    );
  }
    

    export default Offer