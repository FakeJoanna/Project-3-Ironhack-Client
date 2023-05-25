import "./FollowerWardrobe.css";

import axios from "axios";

import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../../context/auth.context";

import ProductCard from "../ProductCard/ProductCard";

const API_URL = "http://localhost:5005";

function FollowerWardrobe() {
  const storedToken = localStorage.getItem("authToken");
  const [followerWardrobe, setFollowerWardrobe] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/api/member/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const following = response.data.following;
          const userFollows = following.flatMap((follow) => follow.userFollows);
          const products = userFollows.flatMap((follow) => follow.product);
          setFollowerWardrobe(products);
        })
        .catch((err) => console.log(err));
    }
  }, [user, storedToken]);

  return (
    <>
      {followerWardrobe.length > 0 && (
        <>
          <h1 className="wardrobeText">Wardrobe of Followers</h1>

          <div className="wardrobeDiv">
            
            {followerWardrobe.slice(0, 10).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
              
            
          </div>
        </>
        )}
    </>
  )
}

export default FollowerWardrobe;