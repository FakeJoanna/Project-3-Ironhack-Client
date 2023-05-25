import "./CheckoutInfo.css"

function CheckoutInfo({ info, setInfo }) {

    function handleChange(e) {
        const { name, value } = e.target
        setInfo(prevState => ({...prevState, [name]: value}))
    }

    return(
        <div className="checkoutInfoWrapper">

            <div className="checkoutGrouper">
                    <div className="checkoutInfoDiv">
                        <label className="checkoutLabel">First Name</label>
                        <input value={info.firstName} onChange={handleChange} className="checkoutInput" type="text" name="firstName" placeholder="John"/>
                    </div>

                    <div className="checkoutInfoDiv">
                        <label className="checkoutLabel">Last Name</label>
                        <input value={info.lastName} onChange={handleChange} className="checkoutInput" type="text" name="lastName" placeholder="Doe"/>
                    </div>
            </div>

            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">Address 1</label>
                    <input value={info.address1} onChange={handleChange} className="checkoutInput" type="text" name="address1" placeholder="Street"/>
                </div>
            </div>
            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">Address 2</label>
                    <input value={info.address2} onChange={handleChange} className="checkoutInput" type="text" name="address2" placeholder="Number, Apartment, Stairs"/>
                </div>
            </div>
            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">Country</label>
                    <input value={info.country} onChange={handleChange} className="checkoutInput" type="text" name="country" placeholder="Worldwide"/>
                </div>
            </div>

            <div className="checkoutGrouper">
                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">City</label>
                    <input value={info.city} onChange={handleChange} className="checkoutInput" type="text" name="city" placeholder="Athens"/>
                </div>

                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">State/Province</label>
                    <input value={info.state} onChange={handleChange} className="checkoutInput" type="text" name="state" placeholder="Arkansas"/>
                </div>

                <div className="checkoutInfoDiv">
                    <label className="checkoutLabel">Zip Code</label>
                    <input value={info.zipCode} onChange={handleChange} className="checkoutInput" type="test" name="zipCode" placeholder="#####"/>
                </div>
            </div>

        </div>
    )
}

export default CheckoutInfo