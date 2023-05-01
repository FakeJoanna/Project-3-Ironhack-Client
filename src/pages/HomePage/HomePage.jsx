import "./HomePage.css";

import LatestProducts from "../../components/LatestProducts/LatestProducts"

function HomePage() {
  return (
    <div>
      <div className="firstSection"> 
        <h1>First Section</h1>
      </div>

      <LatestProducts />
    </div>
  );
}

export default HomePage;
