import "./AddProduct.css"

import { useState } from "react";
import axios from "axios";
 
const API_URL = "http://localhost:5005";

function AddProduct() {

    const [newProduct, setNewProduct] = useState({
        image: "",
        title: "",
        description: "",
        price: 0,
    })

////////  ADD ALSO THE INPUT FOR THE IMAGE ///////
    // const handleImage = (e) => setImage(e.target.value)
    // const handleTitle = (e) => setTitle(e.target.value)
    // const handleDescription = (e) => setDescription(e.target.value)
    // const handlePrice = (e) => setPrice(e.target.value)


    // const handleSubmit = (e) => {
        
    //     e.preventDefault()

    //     const requestBody = { image, title, description, price }

    //     axios.post(`${API_URL}/api/projects`, requestBody)
    //     .then(response => {
            
    //         // Reset the state

    //         setImage("")
    //         setTitle("")
    //         setDescription("")
    //         setPrice(0)

            
    //     })
    //     .catch(err => console.log(err))
    // }


    ////// ADD THIS FORM,  FROM A BUTTON ON THE NAV BAR ( ADD A PRODUCT ) ///////


    return (
        <div className="formDiv">
            <form className="addProductForm">
                <h3>Add Product</h3>
                <input name="image" type="file" multiple alt=""></input>
                <input type="text" multiple alt=""></input>
                <input type="text" multiple alt=""></input>
                <input type="number" multiple alt=""></input>
            </form>
        </div>
    )

}

export default AddProduct