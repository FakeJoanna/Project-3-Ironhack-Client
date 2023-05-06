import "./EditProductPage.css"

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import ImageInput from "../../components/ImageInput/ImageInput";
 
const API_URL = "http://localhost:5005";

 
function EditProjectPage() {

    const { productId } = useParams();   
    const navigate = useNavigate();  

    const [imagesLoading, setImagesLoading] = useState(false)
    const [imageURLs, setImageURLs] = useState([])
    const [product, setProduct] = useState({
        img: [],
        title: "",
        description: "",
        price: 0,
    })

    useEffect(() => {
        axios.get(`${API_URL}/api/products/${productId}`)
            .then((response) => {
                const oneProduct = response.data;
                setProduct(oneProduct)
                setImageURLs(oneProduct.img)
                setImagesLoading(!imagesLoading)
            })
            .catch((error) => console.log(error));
        
    }, [productId]);

    useEffect(() => {
        setProduct(prevState => ({...prevState, img: imageURLs}))
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
        setProduct(prevState => ({...prevState, [name]: value}))
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`${API_URL}/api/products/${productId}/edit`, product)
            .then(() => {
                console.log("success")
                navigate(`/products/${productId}`)
            })
            .catch(err => console.log(err))
    }

    function handleDelete() {                    
        axios.delete(`${API_URL}/api/products/${productId}`)
        .then(() => {
            navigate("/products");
        })
        .catch((err) => console.log(err));
    };  
     
      ///////////////////////
    
    return (
        <>
            <div className="baseDiv">
                <form className="editProductForm" onSubmit={handleSubmit}>
                    <h3>Edit product</h3>
                    <div className="editImageFormDiv">
                        <p>Change images</p>
                        <ImageInput imagesLoading={imagesLoading} setImageURLs={setImageURLs} imageURLs={imageURLs} handleImages={handleImages}/>
                    </div>
                    <div className="editFormDiv">
                        <p>Title</p>
                        <input name="title" type="text" alt="" onChange={handleChange} value={product.title}></input>
                    </div>
                    <div className="editFormDiv descriptionDiv">
                        <p>Description</p>
                        <textarea name="description" type="text" alt="" onChange={handleChange} value={product.description}></textarea>
                    </div>
                    <div className="editFormDiv">
                        <p>Price</p>
                        <input name="price" type="number" alt="" onChange={handleChange} value={product.price}></input>
                    </div>
                    <button className="uploadButton" onClick={handleSubmit}>EDIT</button>
                </form>

            </div>
            {/* Move to product details page and show if product belongs to user? */}
            {/* <button className="deleteProductButton" onClick={handleDelete}>DELETE PRODUCT</button> */}
        </>
    );
  }
   
  export default EditProjectPage;