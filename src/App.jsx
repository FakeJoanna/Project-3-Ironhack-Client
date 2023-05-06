import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

import Navbar from "./components/Navbar/Navbar.jsx";
import IsPrivate from "./components/IsPrivate/IsPrivate.jsx";
import IsAnon from "./components/IsAnon/IsAnon.jsx";

import ProductsListPage from "./pages/ProductsListPage/ProductsListPage.jsx";
import AddProduct from "./pages/AddProduct/AddProduct.jsx"
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage.jsx"
import EditProductPage from "./pages/EditProductPage/EditProductPage.jsx"

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/member"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route path="/products" element={<ProductsListPage />}/>

        <Route path="/new-product" element={<AddProduct />} />

        <Route path="/products/:productId" element={<ProductDetailPage />} />

        <Route path="/products/:productId/edit" element={<EditProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
