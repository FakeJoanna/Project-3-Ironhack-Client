import "./UnderNavbar.css";
import { Link } from "react-router-dom";

function UnderNavBar() {

  return (
    <nav className="underNavbar">
    
     <div className="text-underNavbar">

        <Link to="/products">
          <p>All products</p>
        </Link>

        <Link to="/products/men">
          <p>Men</p>
        </Link>

        <Link to="/products/women">
          <p>Women</p>
        </Link>

        <p>Kids</p>
        <p>Home</p>
        <p>Accesories</p>

     </div>

    </nav>
  );
}

export default UnderNavBar ;
