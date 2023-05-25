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
        state: "",
        brand: "",
        size: "",
        color: "",
        country: "",
        category: "",
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
        <div className="addProductDiv">
            <div className="addProductFormDiv">
                <form className="addProductForm" onSubmit={handleSubmit}>
                    <div>
                        <ImageInput imagesLoading={imagesLoading} setImageURLs={setImageURLs} imageURLs={imageURLs} handleImages={handleImages}/>
                    </div>
                    <div>
                        <label>Title</label>
                        <input name="title" placeholder="Name of the product" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea name="description" placeholder="Description of the product" type="text" alt="" onChange={handleChange}></textarea>
                    </div>
                    <div>
                      <label>Category</label>
                        <select name="category" onChange={handleChange}>
                                <option value="">Select a category</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Home">Home</option>
                                <option value="Baby">Baby</option>
                                <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                    <div>
                        <label>Price</label>
                        <input name="price" type="number" alt=""  placeholder="$00.00" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>State</label>
                        <input name="state" placeholder="ex: Good" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Brand</label>
                        <input name="brand" placeholder="ex: Zara" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Size</label>
                        <input name="size" placeholder="ex: L" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Color</label>
                        <input name="color" placeholder="ex: Blue" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Country</label>
                        <input name="country" placeholder="ex: France" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <button type="submit" className="addProductButton">ADD A PRODUCT</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct