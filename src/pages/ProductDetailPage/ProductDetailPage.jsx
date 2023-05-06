import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Offer from "../../components/Offer/Offer";
import Review from "../../components/Review/Review";

const API_URL = "http://localhost:5005";     


function ProductDetailPage() {

    const [product, setProduct] = useState(null)
    const [review, setReview] = useState(null)
    const [offer, setOffer] = useState(null)


    const { productId } = useParams(); 

    const getProduct = () => {
        axios.get(`${API_URL}/api/products/${productId}`)
        .then((response) => {
            const singleProduct = response.data
            setProduct(singleProduct)
        })
        .catch(err => console.log(err))
    }

    const getReview = () => {
        axios.get(`${API_URL}/api/products/${productId}/review`)
        .then(response => {
            const reviews = response.data
            setReview(reviews)
            console.log(response.data)
        })
        .catch(err => console.log(err))
    }

    const getOffer = () => {
        axios.get(`${API_URL}/api/products/${productId}/offer`)
        .then(response => {
            const offers = response.data
            setOffer(offers)
            console.log(response.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getProduct();
        getReview();
        getOffer();
    }, []);

    return (
        
        <div>

            {product &&  (
                <>
                {product.img.map(image => {
                    return(
                        <img src={image} alt="" />
                    )
                })}
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </>
            )}


            <Link to="/products">
                <button>Back to products</button>
            </Link>

            <Link to={`/products/${productId}/edit`}>
                <button>Edit Product</button>
            </Link>  

            <Offer />

            <Review />

            {review === null ? <p>Loading reviews...</p> : review.map(reviews => {
                return (
                    <div key={reviews._id}>
                    <img src={reviews.img}/>
                        <h1>{reviews.title}</h1>
                        <p>{reviews.message}</p>
                    </div>
                )
            })}
            {offer === null ? <p>Loading offers...</p> : offer.map(offers => {
                return (
                    <div key={offers._id}>
                        <h1>{offers.price}</h1>
                        <p>{offers.message}</p>
                    </div>
                )
            })}






        </div>
    )
}

export default ProductDetailPage