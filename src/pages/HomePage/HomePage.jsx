import "./HomePage.css";

import { useContext } from "react";

import { Link } from "react-router-dom";
import LatestProducts from "../../components/LatestProducts/LatestProducts"
import FollowerWardrobe from "../../components/FollowerWardrobe/FollowerWardrobe";
import { LanguageContext } from "../../context/lang.context" 

function HomePage() {

  const { language } = useContext(LanguageContext)

  return (

    <div className="homePageDiv">

      <div className="background-image">

        <div className="overlay">
          <div className="overlay-text">
            {language === "EN" && <span>Give a second life<br />to your clothes</span>}
            {language === "FR" && <span>Donner une seconde vie<br />à vos vêtements</span>}
            {language === "ES" && <span>Dale una segunda vida<br />a tu ropa</span>}
          </div>
          <Link to="/new-product" className="overlay-link">
            {language === "EN" && <button className="buttonOverlay">Sell now</button>}
            {language === "FR" && <button className="buttonOverlay">Sell now</button>}
            {language === "ES" && <button className="buttonOverlay">Sell now</button>}
          </Link>
        </div>

      </div>


      <div className="homePageSecondSectionWrapper">

        <div className="secondSectionHeader">
          {language === "EN" && <h1 className="latestProductsText">Recommended for you</h1>}
          {language === "FR" && <h1 className="latestProductsText">Recommender pour vous</h1>}
          {language === "ES" && <h1 className="latestProductsText">Recomendado para ti</h1>}
          <Link to="/products" className='buttonSeeMore'>
            {language === "EN" && <button>See more</button> }
            {language === "FR" && <button>Voir plus</button> }
            {language === "ES" && <button>Ver más</button> }
          </Link>
        </div>

        <LatestProducts />

        <div className="secondSectionHeader">
          {language === "EN" && <h1 className="wardrobeText">Wardrobe of Followers</h1>}
          {language === "FR" && <h1 className="wardrobeText">Garde robe des abonnés</h1>}
          {language === "ES" && <h1 className="wardrobeText">Armario de tus seguidores</h1>}
        </div>

        <FollowerWardrobe />
      </div>
    </div>
  );
};

export default HomePage;