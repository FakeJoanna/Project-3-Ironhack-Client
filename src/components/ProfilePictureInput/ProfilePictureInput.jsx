import "./ProfilePictureInput.css"

import { useEffect, useState, useRef } from "react";
import axios from "axios"

const API_URL = "http://localhost:5005";

function ProfilePictureInput({ changePFP, user }) {

    const canvasRef = useRef(null)
    const imageRef = useRef(null)
    const successMessageRef = useRef(null)

    const [imageURL, setImageURL] = useState(user.profilePicture)
    const [triggered, setTriggered] = useState(false)

    useEffect(() => {
        if(imageURL === user.profilePicture) {
            return
        }

        loadCanvas()
        const requestBody = {newProfilePicture: imageURL, email: user.email}
        changePFP(requestBody)
    }, [imageURL])

    function loadCanvas() {
        const img = new Image()
        img.src = imageURL
        img.onload = () => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
    
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            canvas.classList.remove("loading")
            canvas.classList.add("rotatePFP")
        }
    }

    function handleClick(e) {
        e.preventDefault()
        const fileInput = document.getElementById("fileInput")
        fileInput.click()
    }

    function handleFileInput(e) {
        if(triggered === true) {
            const canvas = canvasRef.current
            canvas.classList.remove("rotatePFP")
            const ctx = canvas.getContext("2d")
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
        else {
            setTriggered(true)
        }
        
        imageRef.current.style.display = "none"
        canvasRef.current.classList.add("loading")
        const imageData = new FormData()
        imageData.append("image", e.target.files[0])

        axios.post(`${API_URL}/api/upload`, imageData)
            .then(response => {
                setImageURL(response.data)
            })
            .catch(err => console.log(err))

    }

    return(
        <div className="profilePictureInputDiv">
                <canvas className="profilePictureCanvas" ref={canvasRef}></canvas>
                <img ref={imageRef} className="currentPFP" src={user.profilePicture} alt="" />
                <button className="editPFPButton" onClick={handleClick}></button>
                <input id="fileInput" className="hiddenImageInput" type="file" onChange={handleFileInput}/>
                <p ref={successMessageRef} className="changePFP-success-message">Profile picture changed.</p>
        </div>
    )
}

export default ProfilePictureInput