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

    function handleChange(event) {
        const { name, value } = event.target
        setNewProduct(prevState => ({...prevState, [name]: value}))
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`${API_URL}/api/products`, newProduct)
            .then(response => {
                console.log("success")
            })
    }

    return (
        <div className="baseDiv">
            <form className="addProductForm" onSubmit={handleSubmit}>
                <h3>Add a product</h3>
                <div className="imageFormDiv">
                    <p>Add up to 5 images</p>
                    <input name="image" type="file" multiple alt="" onChange={handleChange}></input>
                </div>
                <div className="formDiv">
                    <p>Title</p>
                    <input name="title" type="text" alt="" onChange={handleChange}></input>
                </div>
                <div className="formDiv">
                    <p>Description</p>
                    <input name="description" type="text" alt="" onChange={handleChange}></input>
                </div>
                <div className="formDiv">
                    <p>Price</p>
                    <input name="price" type="number" alt="" onChange={handleChange}></input>
                </div>
                <button>Upload</button>
            </form>
        </div>
    )
}

export default AddProduct