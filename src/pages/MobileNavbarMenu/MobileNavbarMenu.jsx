import "./MobileNavbarMenu.css"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { LanguageContext } from "../../context/lang.context" 

function MobileNavbarMenu() {

    const navigate = useNavigate()
    const { user, logOutUser } = useContext(AuthContext)
    const { language } = useContext(LanguageContext)

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
                {language === "EN" && <p>Favourites</p>}
                {language === "FR" && <p>Favoris</p>}
                {language === "ES" && <p>Favoritos</p>}
            </div>
            <hr />
            <div className="mobileMenuRow" onClick={goToMesages}>
                <div className="mobileMenuImageDiv">
                    <img className="mobileMenuMessagesIcon" src="https://i.imgur.com/qeJCkCy.png" alt="" />
                </div>
                {language === "EN" && <p>Messages</p>}
                {language === "EN" && <p>Méssages</p>}
                {language === "EN" && <p>Mensajes</p>}
            </div>
            <hr />
            {language === "EN" && <button className="mobileMenuButton" onClick={logOutUser}>Logout</button>}
            {language === "EN" && <button className="mobileMenuButton" onClick={logOutUser}>Déconnexion</button>}
            {language === "ES" && <button className="mobileMenuButton" onClick={logOutUser}>Cerrar sesión</button>}
        </div>
    )
}

export default MobileNavbarMenu