import "./EditProductPage.css"

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "../../context/auth.context"
import ImageInput from "../../components/ImageInput/ImageInput";
 
const API_URL = "http://localhost:5005";

 
function EditProjectPage() {

    const { user } = useContext(AuthContext)

    const { productId } = useParams()
    const navigate = useNavigate()

    const [imagesLoading, setImagesLoading] = useState(false)
    const [imageURLs, setImageURLs] = useState([])
    const [product, setProduct] = useState({
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
        axios.get(`${API_URL}/api/products/${productId}`)
            .then((response) => {
                setProduct(response.data)
                setImageURLs(response.data.img)
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
            navigate(`/member/${user._id}`);
        })
        .catch((err) => console.log(err));
    };  
     
      ///////////////////////
    
    return (
        <div className="editProductDiv">
            <div className="editProductFormDiv">
                <form className="editProductForm" onSubmit={handleSubmit}>
                    <div>
                        <ImageInput imagesLoading={imagesLoading} setImageURLs={setImageURLs} imageURLs={imageURLs} handleImages={handleImages}/>
                    </div>
                    <div>
                        <label>Title</label>
                        <input value={product.title} name="title" placeholder="Name of the product" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea value={product.description} name="description" placeholder="Description of the product" type="text" alt="" onChange={handleChange}></textarea>
                    </div>
                    <div>
                      <label>Category</label>
                        <select value={product.category} name="category" onChange={handleChange}>
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
                        <input value={product.price} name="price" type="number" alt=""  placeholder="$00.00" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>State</label>
                        <input value={product.state} name="state" placeholder="ex: Good" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Brand</label>
                        <input value={product.brand} name="brand" placeholder="ex: Zara" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Size</label>
                        <input value={product.size} name="size" placeholder="ex: L" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Color</label>
                        <input value={product.color} name="color" placeholder="ex: Blue" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Country</label>
                        <input value={product.country} name="country" placeholder="ex: France" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <button type="submit" className="submitEditsButton">EDIT PRODUCT</button>
                </form>
                <button className="deleteProductButton" onClick={handleDelete}>DELETE PRODUCT</button>
            </div>
        </div>
    );
  }
   
  export default EditProjectPage;