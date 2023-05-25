import "./ProfilePage.css";

import axios from "axios";

import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/auth.context";
import { ChatIDsContext } from "../../context/chatIDs.context";

import ProductsTab from "../../components/ProductsTab/ProductsTab";
import ReviewsTab from "../../components/ReviewsTab/ReviewsTab";
import Loading from "../../components/Loading/Loading";

const API_URL = "http://localhost:5005"; 

function ProfilePage() {

  const storedToken = localStorage.getItem("authToken");

  const { setChatIDs } = useContext(ChatIDsContext)
  const { user } = useContext(AuthContext) //this is the logged in user
  const { userId } = useParams() //this is the user whose profile we're looking at
  const navigate = useNavigate()

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
                <p>{userInfo.review.length === 0 ? "No reviews yet" : userInfo.review.length}</p> 
              </div>
              
              <div className="userButtonsDivWrapper">

                <div className="userButtonsDiv">
                  { user._id === userInfo._id

                  ?

                  <Link to={`/member/${userId}/edit`} >
                    <button className="profileButton">Edit profile</button>
                  </Link>

                  :
                  
                  <>
                  <div className="followButtonDiv">
                      <button className="profileButton" onClick={isFollowed ? handleUnfollow : handleFollow}>
                        {isFollowed ? "Unfollow" : "Follow"}
                      </button>
                  </div>

                    <div className="chatWithUserButton">
                      <button className="profileButton" onClick={handleChatClick}>Chat</button>
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
            <button id="productsTabButton" className="tabButton activeTabButton" onClick={() => handleTabChange("products")}>Products</button>
            <button id="reviewsTabButton" className="tabButton" onClick={() => handleTabChange("reviews")}>Reviews</button>
          </div>

          <hr className="profilePageDivider"/>

          {userInfo ? 
          
          <div className="reviewsAndProductsDiv">
            {activeTab === "products" 
            
            ? 
            
            <ProductsTab products={userInfo.product}/>
            
            :
  
            <ReviewsTab />
            
            }
          </div>
          
          :

          <Loading />
          
          }
        </div>
    </div>
  );
}

export default ProfilePage;
