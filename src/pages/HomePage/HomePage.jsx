import "./HomePage.css";
import { Link } from "react-router-dom";
import LatestProducts from "../../components/LatestProducts/LatestProducts"
import FollowerWardrobe from "../../components/FollowerWardrobe/FollowerWardrobe";
import StickyButton from "../../components/StickyButton/StickyButton";

function HomePage() {
  return (

    <div className="homePageDiv">
      <div className="background-image">

        <div className="overlay">
          <div className="overlay-text">
            <span>Give a second life<br />to your clothes</span>
          </div>
          <Link to="/new-product" className="overlay-link">
            <button className="buttonOverlay">Sell now</button>
          </Link>
        </div>

      </div>


      <div className="container">

        <div className="secondSectionHeader">
          <h1 className="latestProductsText">Recommended for you</h1>
          <Link to="/products" className='buttonSeeMore'>
            <button>See more</button> 
          </Link>
        </div>

        <LatestProducts />
        <FollowerWardrobe />
      </div>
    </div>
  );
};

export default HomePage;