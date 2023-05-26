import "./UnderNavbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../context/lang.context" 

function UnderNavBar() {

  const { language } = useContext(LanguageContext) 


  return (
    <nav className="underNavbar">
    
     <div className="text-underNavbar">

        <Link to="/products">
          {language === "EN" && <p>All products</p>}
          {language === "FR" && <p>Tous les produits</p>}
          {language === "ES" && <p>Todos los productos</p>}
        </Link>

        <Link to="/products/men">
          {language === "EN" && <p>Men</p>}
          {language === "FR" && <p>Hommes</p>}
          {language === "ES" && <p>Hombres</p>}
        </Link>

        <Link to="/products/women">
          {language === "EN" && <p>Women</p>}
          {language === "FR" && <p>Femmes</p>}
          {language === "ES" && <p>Mujeres</p>}
        </Link>

       { language === 'EN' && <p>Kids</p>}
       { language === 'FR' && <p>Enfants</p>}
       { language === 'ES' && <p>Niños</p>}
       
       { language === 'EN' && <p>Home</p>}
       { language === 'FR' && <p>Maison</p>}
       { language === 'ES' && <p>Hogar</p>}
       
        {language === "EN" && <p>Accesories</p>}
        {language === "FR" && <p>Accessoire</p>}
        {language === "ES" && <p>Accesorios</p>}

     </div>

    </nav>
  );
}

export default UnderNavBar ;
