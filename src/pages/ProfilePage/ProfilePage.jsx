import "./ProfilePage.css";

import axios from "axios";

import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/auth.context";
import { ChatIDsContext } from "../../context/chatIDs.context";
import { LanguageContext } from "../../context/lang.context" 

import ProductsTab from "../../components/ProductsTab/ProductsTab";
import ReviewsTab from "../../components/ReviewsTab/ReviewsTab";
import Loading from "../../components/Loading/Loading";

const API_URL =  process.env.REACT_APP_API_URL; 

function ProfilePage() {

  const storedToken = localStorage.getItem("authToken");

  const { setChatIDs } = useContext(ChatIDsContext)
  const { user } = useContext(AuthContext) //this is the logged in user
  const { userId } = useParams() //this is the user whose profile we're looking at
  const navigate = useNavigate()
  const { language } = useContext(LanguageContext)

  const [userInfo, setUserInfo] = useState(null)
  const [activeTab, setActiveTab] = useState("products")
  const [isFollowed, setIsFollowed] = useState(false); 
  
  useEffect(() => {
    getUser()
    checkFollow()
  }, [userId]);

  function getUser() {
    axios.get(`${API_URL}/api/member/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => {
      setUserInfo(response.data)
    })
  }

  function checkFollow() {
    axios.post(`${API_URL}/api/follow-check/`, {user: user._id, userToCheck: userId})
    .then((response) => {
      setIsFollowed(response.data.following)
    })
    .catch(err => console.log(err))
  }

  function handleFollow(e) {
    e.preventDefault();
    axios.post(`${API_URL}/api/follow/${userId}`, {}, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      setIsFollowed(true)
    })
    .catch(err => console.log(err))
  }

  function handleUnfollow(e) {
    e.preventDefault();
    axios.delete(`${API_URL}/api/follow/${userId}`,  { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      setIsFollowed(false)
    })
    .catch(err => console.log(err))
  }

  function handleChatClick() {
    setChatIDs([user._id, userId])
    navigate("/message")
  }

  const productsButton = document.getElementById("productsTabButton")
  const reviewsButton = document.getElementById("reviewsTabButton")

  function handleTabChange(tab) {
    if(tab === "products") {
      setActiveTab("products")
      productsButton.classList.add("activeTabButton")
      reviewsButton.classList.remove("activeTabButton")
    }
    else {
      setActiveTab("reviews")
      reviewsButton.classList.add("activeTabButton")
      productsButton.classList.remove("activeTabButton")      
    }
  }

  return (
    <div className="profilePageDiv">
      <div className="profilePageWrapper">

          <div className="userDiv">
            <div className="userPictureDiv">

              {userInfo ?

              <img className="profilePic" src={userInfo.profilePicture} alt="" />

              :

              <Loading />

              }

            </div>

            {userInfo ? 
            
            <div className="userInfoDiv">

              <div className="userInfoTextDiv">
                <h2>{userInfo.name}</h2>
                {language === "EN" && <p>{userInfo.review.length === 0 ? "No reviews yet" : userInfo.review.length + " reviews"}</p> }
                {language === "FR" && <p>{userInfo.review.length === 0 ? "Pas de commentaires" : userInfo.review.length + " avis"}</p> }
                {language === "ES" && <p>{userInfo.review.length === 0 ? "Ninguna reseña por ahora" : userInfo.review.length + " reseñas"}</p> }
              </div>
              
              <div className="userButtonsDivWrapper">

                <div className="userButtonsDiv">
                  { user._id === userInfo._id

                  ?

                  <Link to={`/member/${userId}/edit`} >
                    {language === "EN" && <button className="profileButton">Edit profile</button>}
                    {language === "FR" && <button className="profileButton">Editer profile</button>}
                    {language === "ES" && <button className="profileButton">Editar perfil</button>}
                  </Link>

                  :
                  
                  <>
                    {language === "EN" && <div className="followButtonDiv">
                        <button className="profileButton" onClick={isFollowed ? handleUnfollow : handleFollow}>
                          {isFollowed ? "Unfollow" : "Follow"}
                        </button>
                    </div>}
                    {language === "FR" && <div className="followButtonDiv">
                        <button className="profileButton" onClick={isFollowed ? handleUnfollow : handleFollow}>
                          {isFollowed ? "Ne plus suivre" : "Suivre"}
                        </button>
                    </div>}
                    {language === "ES" && <div className="followButtonDiv">
                        <button className="profileButton" onClick={isFollowed ? handleUnfollow : handleFollow}>
                          {isFollowed ? "Dejar de seguir" : "Seguir"}
                        </button>
                    </div>}

                    <div className="chatWithUserButton">
                      {language === "EN" && <button className="profileButton" onClick={handleChatClick}>Chat</button>}
                      {language === "FR" && <button className="profileButton" onClick={handleChatClick}>Chat</button>}
                      {language === "ES" && <button className="profileButton" onClick={handleChatClick}>Conversar</button>}
                    </div>
                  </>

                  }
                </div>
              </div>
            </div>

            :
            
            <Loading />
            
            }
            
          </div>

          <div className="tabButtonsDiv">
           {language === "EN" && <button id="productsTabButton" className="tabButton activeTabButton" onClick={() => handleTabChange("products")}>Products</button>}
           {language === "FR" && <button id="productsTabButton" className="tabButton activeTabButton" onClick={() => handleTabChange("products")}>Produits</button>}
           {language === "ES" && <button id="productsTabButton" className="tabButton activeTabButton" onClick={() => handleTabChange("products")}>Productos</button>}
           
           {language === "EN" &&  <button id="reviewsTabButton" className="tabButton" onClick={() => handleTabChange("reviews")}>Reviews</button>}         
           {language === "FR" &&  <button id="reviewsTabButton" className="tabButton" onClick={() => handleTabChange("reviews")}>Commentaires</button>}         
           {language === "ES" &&  <button id="reviewsTabButton" className="tabButton" onClick={() => handleTabChange("reviews")}>Reseñas</button>}         
 </div>

          <hr className="profilePageDivider"/>

          {userInfo ? 
          
          <div className="reviewsAndProductsDiv">
            {activeTab === "products" 
            
            ? 
            
            <ProductsTab products={userInfo.product}/>
            
            :
  
            <ReviewsTab reviews={userInfo.review}/>
            
            }
          </div>
          
          :

          <Loading/>
          
          }
        </div>
    </div>
  );
}

export default ProfilePage;
