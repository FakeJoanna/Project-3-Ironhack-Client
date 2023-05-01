import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="logoDiv">
        <img src="https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-1.png" alt=""/>
      </div>

      <div className="searchBarDiv">
        <form className="searchBarForm">
          <img className="glass" src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/magnifying-glass-icon.png" alt=""/>
          <input type="text" className="searchBar" placeholder="Search for products"></input>
        </form>
      </div>
      <div className="buttonsDiv">
        <Link to="/">
          <button className="button normalColors">Home</button>
        </Link>

        {isLoggedIn && (
          <>
            <button onClick={logOutUser}>Logout</button>

            <Link to="/profile">
              <button>Profile</button>
              {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
            </Link>

            <span>{user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              {" "}
              <button className="button invertedColors">Sign Up</button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button className="button normalColors">Login</button>{" "}
            </Link>
          </>
        )}

        <Link to="/new-product">
          <button className="button invertedColors">Sell a product</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
