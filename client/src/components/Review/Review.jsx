import "./Review.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ReviewImageInput from "../../components/ReviewImageInput/ReviewImageInput.jsx";

const API_URL = "http://localhost:5005";

function Review() {

    const storedToken = localStorage.getItem("authToken");

    const { productId } = useParams()

    const [imagesLoading, setImagesLoading] = useState(false)
    const [imageURLs, setImageURLs] = useState([])

    const [review, setReview] = useState({
        img: [""],
        title: "",
        message: ""
    })
    
    useEffect(() => {
        setReview(prevState => ({...prevState, img: imageURLs}))
    }, [imageURLs])


    const handleChange = (event) => {
        const { name, value } = event.target
        setReview(prevState => ({...prevState, [name]: value}))
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${API_URL}/api/products/${productId}/review`, review, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
            console.log("success")
        })
        
    }

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
    

  return (

    <div>
            <form className="reviewForm" onSubmit={handleSubmit}>

                <h1>Add a Review</h1>

                    <ReviewImageInput imagesLoading={imagesLoading} setImageURLs={setImageURLs} imageURLs={imageURLs} handleImages={handleImages}/>

                
                    <input name="title" type="text" alt="" onChange={handleChange}></input>
                    <textarea name="message" type="text" onChange={handleChange}></textarea>

                    {/* Maybe add later as feature stars rating */}

                <button type="submit">Add review</button>
            </form>


    </div>
  )


}

export default Review