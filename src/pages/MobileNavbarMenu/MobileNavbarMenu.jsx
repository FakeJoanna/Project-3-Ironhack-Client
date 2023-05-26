import "./MobileNavbarMenu.css"

import { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { LanguageContext } from "../../context/lang.context" 

function MobileNavbarMenu() {

    const navigate = useNavigate()
    const { user, logOutUser, isLoggedIn } = useContext(AuthContext)
    const { language, setLanguage } = useContext(LanguageContext)

    const [query, setQuery] = useState(null)

    function goToProfile() {
        navigate(`/member/${user._id}`)
    }

    function goToMesages() {
        navigate("/message")
    }

    function storeQuery(e) {
        setQuery(e.target.value)
    }

    function handleSearch(e) {
        e.preventDefault()
        if(query === null) {
            return
        }
        navigate(`/search?q=${query}`)
    }

    return(
        
        <div className="mobileNavbarMenuDiv">

            <div className="mobileMenuRow">

                <form className="mobileMenuSearchBar" onSubmit={handleSearch}>
                    <input type="text" className="mobileMenuSearchInput" placeholder="Search for products" onChange={storeQuery} /> 
                </form>
            </div>

            <hr />  

            {isLoggedIn &&
            <>
                <div className="mobileMenuRow" onClick={goToProfile}>
                    <div className="mobileMenuImageDiv">
                        <img className="mobileMenuProfilePic" src={user.profilePicture} alt="" />
                    </div>
                    <p>{user.name}</p>
                </div>

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
                    {language === "FR" && <p>Méssages</p>}
                    {language === "ES" && <p>Mensajes</p>}
                </div>

                <hr />

                <div className="mobileMenuRow">
                    {language === "EN" && <Link to="/new-product">
                        <button className="sellNowMobileButton">Sell now</button>
                    </Link>}
                    {language === "FR" && <Link to="/new-product">
                        <button className="sellNowMobileButton">Vendre</button>
                    </Link>}
                    {language === "ES" && <Link to="/new-product">
                        <button className="sellNowMobileButton">Vender</button>
                    </Link>}
                </div>

                <hr />

                <div className="languageButtonsRow">
                    <p onClick={() => setLanguage("EN")}>EN</p>
                    <p onClick={() => setLanguage("FR")}>FR</p>
                    <p onClick={() => setLanguage("ES")}>ES</p>
                </div>

                <hr />

                <div className="mobileMenuRow">
                    {language === "EN" && <button className="mobileMenuLogOut" onClick={logOutUser}>Logout</button>}
                    {language === "FR" && <button className="mobileMenuLogOut" onClick={logOutUser}>Déconnexion</button>}
                    {language === "ES" && <button className="mobileMenuLogOut" onClick={logOutUser}>Cerrar sesión</button>}
                </div>
            </>
            }

            {!isLoggedIn && (
            <>
                <div className="mobileMenuRow">
                    {language === "EN" && <Link to="/signup">
                        <button className="mobileMenuSignUp">Sign Up</button>
                    </Link>}
                    {language === "FR" && <Link to="/signup">
                        <button className="mobileMenuSignUp">Crée un compte</button>
                    </Link>}
                    {language === "ES" && <Link to="/signup">
                        <button className="mobileMenuSignUp">Registrarse</button>
                    </Link>}
                </div>

                <hr />

                <div className="mobileMenuRow">
                    {language === "EN" && <Link to="/login">
                        <button className="mobileMenuLogin">Login</button>
                    </Link>}
                    {language === "FR" && <Link to="/login">
                        <button className="mobileMenuLogin">Connexion</button>
                    </Link>}
                    {language === "ES" && <Link to="/login">
                        <button className="mobileMenuLogin">Iniciar sesión</button>
                    </Link>}
                </div>
            
                <hr />
                
                <div className="languageButtonsRow">
                    <p onClick={() => setLanguage("EN")}>EN</p>
                    <p onClick={() => setLanguage("FR")}>FR</p>
                    <p onClick={() => setLanguage("ES")}>ES</p>
                </div>

                
            </>
            )}

        </div>
    )
}

export default MobileNavbarMenu