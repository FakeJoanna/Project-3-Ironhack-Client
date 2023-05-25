import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios"

const AuthContext = React.createContext()

const API_URL = "http://localhost:5005"

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    authenticateUser()
  }, [])

  function storeToken(token) {
    localStorage.setItem("authToken", token)
  }
  
  function removeToken() {
    localStorage.removeItem("authToken")
  }

  function authenticateUser() { 
    const storedToken = localStorage.getItem("authToken")

    if (storedToken) {
      axios.get(`${API_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const user = response.data
        setIsLoggedIn(true)
        setIsLoading(false)
        setUser(user)
      })
      .catch(() => {
        setIsLoggedIn(false)
        setIsLoading(false)
        setUser(null)
      })

    } else {
      setIsLoggedIn(false)
      setIsLoading(false)
      setUser(null)
    }
  }

  function signup(requestBody) {
    axios.post(`${API_URL}/auth/signup`, requestBody)
    .then((response) => {
      storeToken(response.data.authToken)
      authenticateUser()
      navigate("/")
    })
    .catch((error) => {
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    })
  }

  const googleSignup = useGoogleLogin({
    onSuccess: codeResponse => {
      axios.post(`${API_URL}/auth/signup-google`, { accessToken: codeResponse.access_token })
      .then(response => {
        storeToken(response.data.authToken)
        authenticateUser()
        navigate("/")
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
    }
  })

  function login(requestBody) {
    axios.post(`${API_URL}/auth/login`, requestBody)
    .then((response) => {
      storeToken(response.data.authToken)
      authenticateUser()
      navigate("/")
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    });
  }

  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => {
      axios.post(`${API_URL}/auth/login-google`, { accessToken: codeResponse.access_token })
      .then(response => {
        storeToken(response.data.authToken)
        authenticateUser()
        navigate("/")
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
    }
  })

  function changePassword(requestBody) {
    const storedToken = localStorage.getItem("authToken")

    axios.post(`${API_URL}/auth/change-password`, requestBody,  { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      const successMessage = response.data.message
      setErrorMessage(successMessage)
      setTimeout(() => {
        navigate("/")
        setErrorMessage(null)
      }, 2000);
    })
    .catch((error) => {
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    })
  }

  function changePFP(requestBody) {
    const storedToken = localStorage.getItem("authToken")

    axios.post(`${API_URL}/auth/change-pfp`, requestBody,  { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      setUser(prevState => ({...prevState, profilePicture: response.data.profilePicture}))
      storeToken(response.data.authToken)
    })
    .catch((error) => {
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    })
  }
  

  function logOutUser() {
    removeToken()
    authenticateUser()
  }


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        errorMessage,
        storeToken,
        authenticateUser,
        logOutUser,
        signup,
        login,
        googleSignup,
        googleLogin,
        changePassword,
        changePFP,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }
