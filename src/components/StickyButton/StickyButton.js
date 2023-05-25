import React from "react";
import "./StickyButton.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/auth.context";

const StickyButton = () => {

    const { isLoggedIn, logOutUser, user } = useContext(AuthContext)


  

  

    return (
        <>
          {isLoggedIn ? (
            <Link to="/new-product">
              <button id="stickyButtonLogIn">Sell a product</button>
            </Link>
          ) : (
            <Link to="/login">
              <button id="stickyButtonLogIn">Sell a product</button>
            </Link>
          )}
        </>
      );
    };

export default StickyButton;