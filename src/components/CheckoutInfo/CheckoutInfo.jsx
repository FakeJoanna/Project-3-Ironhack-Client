import "./CheckoutInfo.css"

import { useContext } from "react"

import { LanguageContext } from "../../context/lang.context"

function CheckoutInfo({ info, setInfo }) {

    const { language } = useContext(LanguageContext)

    function handleChange(e) {
        const { name, value } = e.target
        setInfo(prevState => ({...prevState, [name]: value}))
    }

    return(
        <div className="checkoutInfoWrapper">

            <div className="checkoutGrouper">
                    <div className="checkoutInfoDiv">
                       {language === "EN" && <label className="checkoutLabel">First Name</label>}
                       {language === "FR" && <label className="checkoutLabel">Prénom</label>}
                       {language === "ES" && <label className="checkoutLabel">Nombre</label>}
                        <input value={info.firstName} onChange={handleChange} className="checkoutInput" type="text" name="firstName" placeholder="John"/>
                    </div>

                    <div className="checkoutInfoDiv">
                        {language === "EN" && <label className="checkoutLabel">Last Name</label>}
                        {language === "FR" && <label className="checkoutLabel">Nom de famille</label>}
                        {language === "ES" && <label className="checkoutLabel">Apellido</label>}
                        <input value={info.lastName} onChange={handleChange} className="checkoutInput" type="text" name="lastName" placeholder="Doe"/>
                    </div>
            </div>

            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    {language === "EN" && <label className="checkoutLabel">Address 1</label>}
                    {language === "FR" && <label className="checkoutLabel">Adresse 1</label>}
                    {language === "ES" && <label className="checkoutLabel">Dirección 1</label>}
                    <input value={info.address1} onChange={handleChange} className="checkoutInput" type="text" name="address1" placeholder="Street"/>
                </div>
            </div>
            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    {language === "EN" && <label className="checkoutLabel">Address 2</label>}
                    {language === "FR" && <label className="checkoutLabel">Adresse 2 </label>}
                    {language === "ES" && <label className="checkoutLabel">Dirección 2</label>}
                    <input value={info.address2} onChange={handleChange} className="checkoutInput" type="text" name="address2" placeholder="Number, Apartment, Stairs"/>
                </div>
            </div>
            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    {language === "EN" &&<label className="checkoutLabel">Country</label>}
                    {language === "FR" &&<label className="checkoutLabel">Pays</label>}
                    {language === "ES" &&<label className="checkoutLabel">País</label>}
                    <input value={info.country} onChange={handleChange} className="checkoutInput" type="text" name="country" placeholder="Worldwide"/>
                </div>
            </div>

            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    {language === "EN" && <label className="checkoutLabel">City</label>}
                    {language === "FR" && <label className="checkoutLabel">Ville</label>}
                    {language === "ES" && <label className="checkoutLabel">Ciudad</label>}
                    <input value={info.city} onChange={handleChange} className="checkoutInput" type="text" name="city" placeholder="Athens"/>
                </div>

                <div className="checkoutInfoDiv">
                    {language === "EN" && <label className="checkoutLabel">State/Province</label>}
                    {language === "FR" && <label className="checkoutLabel">Etat/Province</label>}
                    {language === "ES" && <label className="checkoutLabel">Estado/Provincia</label>}
                    <input value={info.state} onChange={handleChange} className="checkoutInput" type="text" name="state" placeholder="Arkansas"/>
                </div>

                <div className="checkoutInfoDiv">
                    {language === "EN" && <label className="checkoutLabel">Zip Code</label>}
                    {language === "FR" && <label className="checkoutLabel">Code Postal</label>}
                    {language === "ES" && <label className="checkoutLabel">Código ZIP</label>}
                    <input value={info.zipCode} onChange={handleChange} className="checkoutInput" type="test" name="zipCode" placeholder="#####"/>
                </div>
            </div>

        </div>
    )
}

export default CheckoutInfo