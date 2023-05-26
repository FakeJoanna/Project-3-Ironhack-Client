import "./ProductDetailPage.css"

import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { LanguageContext } from "../../context/lang.context" 

import Carousel from "../../components/Carousel/Carousel";
import DetailsSidebar from "../../components/DetailsSidebar/DetailsSidebar";
import Loading from "../../components/Loading/Loading"
import YouMightAlsoLike from "../../components/YouMightAlsoLike/YouMightAlsoLike"
import axios from "axios";

const API_URL =  process.env.REACT_APP_API_URL;     

function ProductDetailPage() {

    const { user } = useContext(AuthContext)
    const { productId } = useParams(); 
    const { language } = useContext(LanguageContext)

    const [product, setProduct] = useState(null)
    const [userInfo, setUserInfo] = useState(null) //to fetch review numbers and profile picture img
  

    useEffect(() => {
        axios.get(`${API_URL}/api/products/${productId}`)
        .then((response) => {
            setProduct(response.data)
            setUserInfo(response.data.user[0])
        })
        .catch(err => console.log(err))
        
    }, [productId]);


    return (
        <div className="productDetailsDiv">

            <div className="productDetailsWrapper">
                {product && userInfo
                
                ?

                <>
                    <div className="productDetailsMainDiv">
                        <Carousel images={product.img} />
                        {user && userInfo._id === user._id
                        
                        ?

                        <Link to={`/products/${product._id}/edit`}>
                            {language === "EN" && <button className="editProductButton">EDIT PRODUCT</button>}
                            {language === "FR" && <button className="editProductButton">EDITER PRODUIT</button>}
                            {language === "ES" && <button className="editProductButton">EDITAR PRODUCTO</button>}
                        </Link>

                        :

                        <></>
                        }
                    </div>
                    
                    <DetailsSidebar product={product} ownerUser={userInfo}/>
                </>

                :

                <Loading />

                }

            
                
            </div>
            
            
            <div className="youMightAlsoLikeWrapper">
                <div className="secondSectionHeader">
                    {language === "EN" && <h1 className="youMightAlsoLikeText">You Might Also Like</h1>}
                    {language === "FR" && <h1 className="youMightAlsoLikeText">Vous pouvez aimer...</h1>}
                    {language === "ES" && <h1 className="youMightAlsoLikeText">Quizas También de Interese</h1>}
                    <Link to="/products" className='buttonSeeMore'>
                        {language === "EN" && <button>See more</button> }
                        {language === "EN" && <button>Voir plus</button> }
                        {language === "EN" && <button>Ver más</button> }
                    </Link>
                </div>
                <YouMightAlsoLike />
            </div>
        </div>
        
    )
}

export default ProductDetailPage