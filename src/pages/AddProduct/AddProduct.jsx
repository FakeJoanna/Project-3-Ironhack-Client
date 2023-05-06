import "./AddProduct.css"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import ImageInput from "../../components/ImageInput/ImageInput";
 
const API_URL = "http://localhost:5005";

function AddProduct() {

    const navigate = useNavigate()
    
    const storedToken = localStorage.getItem("authToken");
    
    const [imagesLoading, setImagesLoading] = useState(false)
    const [imageURLs, setImageURLs] = useState([])
    const [newProduct, setNewProduct] = useState({
        img: [""],
        title: "",
        description: "",
        price: 0,
    })

    useEffect(() => {
        setNewProduct(prevState => ({...prevState, img: imageURLs}))
    }, [imageURLs])

    ///////////////////////

    function handleImages(files) {
        const imageData = new FormData()

        for (let i = 0; i < files.length; i++) {
            imageData.append("image", files[i])
        }
        
        console.log(imageData)
        axios.post(`${API_URL}/api/uploadmany`, imageData)
            .then(response => {
                setImageURLs(response.data)
                setImagesLoading(!imagesLoading)
            })
            .catch(err => console.log(err))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setNewProduct(prevState => ({...prevState, [name]: value}))
        console.log(newProduct)
    }


    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`${API_URL}/api/products`, newProduct, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                navigate(`/products/${response.data._id}`)
            })
            .catch(err => console.log(err))
    }

    ///////////////////////

    return (
        <div className="baseDiv">
            <form className="addProductForm" onSubmit={handleSubmit}>
                <h3>Add a product</h3>
                <div className="imageFormDiv">
                    <p>Add up to 4 images</p>
                    <ImageInput imagesLoading={imagesLoading} setImageURLs={setImageURLs} imageURLs={imageURLs} handleImages={handleImages}/>
                </div>
                <div className="formDiv">
                    <p>Title</p>
                    <input name="title" type="text" alt="" onChange={handleChange}></input>
                </div>
                <div className="formDiv descriptionDiv">
                    <p>Description</p>
                    <textarea name="description" type="text" alt="" onChange={handleChange}></textarea>
                </div>
                <div className="formDiv">
                    <p>Price</p>
                    <input name="price" type="number" alt="" onChange={handleChange}></input>
                </div>
                <button className="uploadButton">Upload</button>
            </form>
        </div>
    )
}

export default AddProduct