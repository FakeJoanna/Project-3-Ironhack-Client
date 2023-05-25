import "./MobileNavbarMenu.css"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"

function MobileNavbarMenu() {

    const navigate = useNavigate()
    const { user, logOutUser } = useContext(AuthContext)

    function goToProfile() {
        navigate(`/member/${user._id}`)
    }

    function goToMesages() {
        navigate("/messages")
    }

    return(
        
        <div className="mobileNavbarMenuDiv">
            {user &&
                <div className="mobileMenuRow" onClick={goToProfile}>
                    <div className="mobileMenuImageDiv">
                        <img className="mobileMenuProfilePic" src={user.profilePicture} alt="" />
                    </div>
                    <p>{user.name}</p>
                </div>
            }
            <hr />
            <div className="mobileMenuRow">
                <div className="mobileMenuImageDiv">
                    <img className="mobileMenuFavouritesIcon" src="https://i.imgur.com/kvFcV1f.png" alt="" />
                </div>
                <p>Favourites</p>
            </div>
            <hr />
            <div className="mobileMenuRow" onClick={goToMesages}>
                <div className="mobileMenuImageDiv">
                    <img className="mobileMenuMessagesIcon" src="https://i.imgur.com/qeJCkCy.png" alt="" />
                </div>
                <p>Messages</p>
            </div>
            <hr />
            <button className="mobileMenuButton" onClick={logOutUser}>Logout</button>
        </div>
    )
}

export default MobileNavbarMenu