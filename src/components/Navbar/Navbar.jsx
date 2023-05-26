import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/auth.context";
import { LanguageContext } from "../../context/lang.context";

import axios from "axios";

import SearchPreview from "../SearchPreview/SearchPreview"
import CartSideBar from "../CartSideBar/CartSideBar";

const API_URL =  process.env.REACT_APP_API_URL

function Navbar() {
    
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext)
  const { language, setLanguage } = useContext(LanguageContext)
  
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [query, setQuery] = useState(null)

  const [navSelection, setNavSelection] = useState("products")
  const [optionsShown, setOptionsShown] = useState(false)
  const navSelector = useRef(null)
  const navOptions = useRef(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [langDropDownOpen, setLangDropDownOpen] = useState(false)

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  // If the user changes location we set products/users to an empty array to remove the preview to avoid ugly overflows
  useEffect(() => {
    setProducts([])
    setUsers([])
  }, [location])

  function previewProducts(e) {
    if (e.target.value === "") {
      setQuery(null)
      setTimeout(() => {
        setProducts([])
      }, 500);
    }
    else {
      setQuery(e.target.value)
      axios.get(`${API_URL}/api/preview?q=${e.target.value}`)
        .then(response => {
          setProducts(response.data)
        })
        .catch(err => console.log(err))
    }
  }

  function previewUsers(e) {
    if (e.target.value === "") {
      setTimeout(() => {
        setUsers([])
      }, 500);
    }
    else {
      axios.get(`${API_URL}/api/member-preview?q=${e.target.value}`)
        .then(response => {
          setUsers(response.data)
        })
        .catch(err => console.log(err))
    }
  }

  function showOptions() {
    navSelector.current.style.borderBottomLeftRadius = "0"
    navOptions.current.style.zIndex = 12;
    setOptionsShown(true)
  }

  function navSelect(option) {
    navOptions.current.style.zIndex = -1;
    navSelector.current.style.borderBottomLeftRadius = "3px"
    setNavSelection(option)
    setProducts([])
    setUsers([])
    setOptionsShown(false)
  }

  function showCartSideBar() {
    setShowCart(true)
  }

  function retractCart() {
    setShowCart(false)
  }

  function mobileNavbarMenu() {
    navigate("/mobile-menu")
  }

  function handleSearch(e) {
    e.preventDefault()
    if(query === null) {
      return
    }
    navigate(`/search?q=${query}`)
  }

  function toggleLanguage() {
    setLangDropDownOpen(!langDropDownOpen)
  }

  return (
    <nav className="projectNavbar">
      <div className="logoDiv">

        <Link to="/" className="logoLink">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Vinted_logo.png" alt="" className="logoImage" />
        </Link>

      </div>
      <div className="threeLineMenu" onClick={mobileNavbarMenu}>
        <img className="threeLineImage" src="https://thumbs.dreamstime.com/b/three-bar-line-icon-symbol-menu-outline-modern-design-element-simple-black-flat-vector-sign-rounded-corners-three-bar-line-110910924.jpg" alt="" />
      </div>

      <div className="searchDiv">
        <div className="searchDivWrapper">

          {language === "EN" && <div className="navSelection" ref={navSelector} onClick={showOptions}>
            {navSelection === "products" ? <p>Products</p> : <p>Members</p>}
            <svg className="navSelectionArrow" viewBox="0 0 16 16"><path d="M8 12L2 6h12z"></path></svg>
          </div>}
          {language === "FR" && <div className="navSelection" ref={navSelector} onClick={showOptions}>
            {navSelection === "products" ? <p>Produits</p> : <p>Membres</p>}
            <svg className="navSelectionArrow" viewBox="0 0 16 16"><path d="M8 12L2 6h12z"></path></svg>
          </div>}
          {language === "ES" && <div className="navSelection" ref={navSelector} onClick={showOptions}>
            {navSelection === "products" ? <p>Products</p> : <p>Miembros</p>}
            <svg className="navSelectionArrow" viewBox="0 0 16 16"><path d="M8 12L2 6h12z"></path></svg>
          </div>}

          {language === "EN" && <div className="navOptions" ref={navOptions}>
            <div className="navOption firstOption" onClick={() => navSelect("products")}>
              <p>Products</p>
              <hr></hr>
            </div>

            <div className="navOption secondOption" onClick={() => navSelect("members")}>
              <p>Members</p>
            </div>
          </div>}
          {language === "FR" && <div className="navOptions" ref={navOptions}>
            <div className="navOption firstOption" onClick={() => navSelect("products")}>
              <p>Produits</p>
              <hr></hr>
            </div>

            <div className="navOption secondOption" onClick={() => navSelect("members")}>
              <p>Membres</p>
            </div>
          </div>}
          {language === "ES" && <div className="navOptions" ref={navOptions}>
            <div className="navOption firstOption" onClick={() => navSelect("products")}>
              <p>Productos</p>
              <hr></hr>
            </div>

            <div className="navOption secondOption" onClick={() => navSelect("members")}>
              <p>Miembros</p>
            </div>
          </div>}

          {optionsShown && <button className="closeNavSelectorButton" onClick={() => navSelect(navSelection)}></button>}

          <form className="searchBarForm" onSubmit={handleSearch}>
          
            {language === "EN" && <div className="searchBar">
            
              {navSelection === "products"
              
              ?
              
              <input type="text" className="searchBarInput" placeholder="Search for products" onChange={previewProducts} /> 

              :

              <input type="text" className="searchBarInput" placeholder="Search for members" onChange={previewUsers} />

              }

            </div>}
            {language === "FR" && <div className="searchBar">
            
              {navSelection === "products"
              
              ?
              
              <input type="text" className="searchBarInput" placeholder="Rechercher un produit" onChange={previewProducts} /> 

              :

              <input type="text" className="searchBarInput" placeholder="Rechercher des membres" onChange={previewUsers} />

              }

            </div>}
            {language === "ES" && <div className="searchBar">
            
              {navSelection === "products"
              
              ?
              
              <input type="text" className="searchBarInput" placeholder="Buscar productos" onChange={previewProducts} /> 

              :

              <input type="text" className="searchBarInput" placeholder="Buscar miembros" onChange={previewUsers} />

              }

            </div>}
              
            {products.length === 0 ? <></> :
            

            <>
              <hr className="previewDivider"/>
              <SearchPreview data={products}/>
            </>
            
            }

            {users.length === 0 ? <></> :
            

            <>
              <hr className="previewDivider"/>
              <SearchPreview data={users}/>
            </>
            
            }            

          </form>
        </div>
      </div>
     
      <div className="buttonsDiv">
        {isLoggedIn && (
          <>
            <Link to="/favorite">
              <img className="wishListIcon" src="https://i.imgur.com/kvFcV1f.png" alt="" />
            </Link> 

            <Link to="/message">
              <img className="messageIcon" src="https://i.imgur.com/qeJCkCy.png" alt="" />
            </Link>

            {language === "EN" && <Link to="/new-product">
              <button className="sellNowButton">Sell now</button>
            </Link>}
            {language === "FR" && <Link to="/new-product">
              <button className="sellNowButton">Vendre</button>
            </Link>}
            {language === "ES" && <Link to="/new-product">
              <button className="sellNowButton">Vender</button>
            </Link>}

            {language === "EN" && <div className="profile-dropdown" onClick={toggleDropdown}>
              <img className="avatar-card2" src={user.profilePicture} alt="" />
              {dropdownOpen && (
                <div className="dropdown-content">
                  <p className="accountTitleDropDown">Account</p>
                  <Link to={`/member/${user._id}`}>Profile</Link>
                  <Link to={`/member/${user._id}/edit`}>Edit Profile</Link>
                  <Link className="logout" onClick={logOutUser}>Log out</Link>
                </div>
              )}
            </div>}
            {language === "FR" && <div className="profile-dropdown" onClick={toggleDropdown}>
              <img className="avatar-card2" src={user.profilePicture} alt="" />
              {dropdownOpen && (
                <div className="dropdown-content">
                  <p className="accountTitleDropDown">Compte</p>
                  <Link to={`/member/${user._id}`}>Profile</Link>
                  <Link to={`/member/${user._id}/edit`}>Editer Profile</Link>
                  <Link className="logout" onClick={logOutUser}>Déconnexion</Link>
                </div>
              )}
            </div>}
            {language === "ES" && <div className="profile-dropdown" onClick={toggleDropdown}>
              <img className="avatar-card2" src={user.profilePicture} alt="" />
              {dropdownOpen && (
                <div className="dropdown-content">
                  <p className="accountTitleDropDown">Cuenta</p>
                  <Link to={`/member/${user._id}`}>Perfil</Link>
                  <Link to={`/member/${user._id}/edit`}>Editar perfil</Link>
                  <Link className="logout" onClick={logOutUser}>Cerrar sesión</Link>
                </div>
              )}
            </div>}

            <button onClick={showCartSideBar} className="shoppingCartButton">
              <img className="shoppingCartIcon" src="https://i.imgur.com/9vTslOy.png" alt="" />
            </button>

            <div className="languageDropdownDiv" onClick={toggleLanguage}>
                <p>{language}</p>
               {langDropDownOpen && (
                <div className="language-dropdown-content">
                {language === "FR" ? <p onClick={() => setLanguage("EN")}>EN</p> : <p onClick={() => setLanguage("FR")}>FR</p>}
                {language === "ES" ? <p onClick={() => setLanguage("EN")}>EN</p> : <p onClick={() => setLanguage("ES")}>ES</p>}  
              </div>
               )}
            </div>
          </>
        )}

        {!isLoggedIn && (
          <>
            {language === "EN" && <Link to="/signup">
              <button className="signUpButton">Sign Up</button>
            </Link>}
            {language === "FR" && <Link to="/signup">
              <button className="signUpButton">Crée un compte</button>
            </Link>}
            {language === "ES" && <Link to="/signup">
              <button className="signUpButton">Registrarse</button>
            </Link>}
            
            {language === "EN" && <Link to="/login">
              <button className="logInButton">Login</button>
            </Link>}
            {language === "FR" && <Link to="/login">
              <button className="logInButton">Connexion</button>
            </Link>}
            {language === "ES" && <Link to="/login">
              <button className="logInButton">Iniciar sesión</button>
            </Link>}

            <div className="languageDropdownDiv" onClick={toggleLanguage}>
                <p>{language}</p>
               {langDropDownOpen && (
                <div className="language-dropdown-content">
                {language === "FR" ? <p onClick={() => setLanguage("EN")}>EN</p> : <p onClick={() => setLanguage("FR")}>FR</p>}
                {language === "ES" ? <p onClick={() => setLanguage("EN")}>EN</p> : <p onClick={() => setLanguage("ES")}>ES</p>}  
              </div>
               )}
            </div>
          </>
        )}


      </div>

      <div className={showCart ? "cartSideBarDiv slideCartIn" : "cartSideBarDiv"}>
        <CartSideBar />
        <div className="cartSideBarDivider"></div>
      </div>

      <div className={showCart ? "dimmerDiv dimming" : "dimmerDiv"}></div>

      {showCart && <button className="retractCartSideBarButton" onClick={retractCart}></button>}
    </nav>
  );
}

export default Navbar;
