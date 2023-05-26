import "./EditProductPage.css"

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "../../context/auth.context"
import { LanguageContext } from "../../context/lang.context";
import ImageInput from "../../components/ImageInput/ImageInput";
 
const API_URL =  process.env.REACT_APP_API_URL;

 
function EditProjectPage() {

    const { user } = useContext(AuthContext)

    const { productId } = useParams()
    const navigate = useNavigate()
    const { language } = useContext(LanguageContext)

    const [imagesLoading, setImagesLoading] = useState(false)
    const [imageURLs, setImageURLs] = useState([])
    const [product, setProduct] = useState({
        img: [""],
        title: "",
        description: "",
        price: 0,
        state: "",
        brand: "",
        size: "",
        color: "",
        country: "",
        category: "",
    })

    useEffect(() => {
        axios.get(`${API_URL}/api/products/${productId}`)
            .then((response) => {
                const { img, title, description, price, state, brand, size, color, country, category } = response.data

                setProduct({
                    img: img || [""],
                    title: title || "",
                    description: description || "",
                    price: price || 0,
                    state: state || "",
                    brand: brand || "",
                    size: size || "",
                    color: color || "",
                    country: country || "",
                    category: category || "",
                })
                
                setImageURLs(response.data.img)
                setImagesLoading(!imagesLoading)
            })
            .catch((error) => console.log(error));
        
    }, [productId]);

    useEffect(() => {
        setProduct(prevState => ({...prevState, img: imageURLs}))
    }, [imageURLs])

    ///////////////////////

    function handleImages(files) {
        const imageData = new FormData()

        for (let i = 0; i < files.length; i++) {
            imageData.append("image", files[i])
        }
        
        console.log(imageData)
        axios.post(`${API_URL}/api/uploadmany`, imageData)
            .then(response => {
                setImageURLs(response.data)
                setImagesLoading(!imagesLoading)
            })
            .catch(err => console.log(err))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setProduct(prevState => ({...prevState, [name]: value}))
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`${API_URL}/api/products/${productId}/edit`, product)
            .then(() => {
                console.log("success")
                navigate(`/products/${productId}`)
            })
            .catch(err => console.log(err))
    }

    function handleDelete() {                    
        axios.delete(`${API_URL}/api/products/${productId}`)
        .then(() => {
            navigate(`/member/${user._id}`);
        })
        .catch((err) => console.log(err));
    };  
     
      ///////////////////////
    
    return (
        <div className="editProductDiv">
            <div className="editProductFormDiv">
                <form className="editProductForm" onSubmit={handleSubmit}>
                    <div>
                        <ImageInput imagesLoading={imagesLoading} setImageURLs={setImageURLs} imageURLs={imageURLs} handleImages={handleImages}/>
                    </div>
                    <div>
                        {language === "EN" && <label>Title</label>}
                        {language === "FR" && <label>Titre</label>}
                        {language === "ES" && <label>Título</label>}
                        
                        {language === "EN" && <input name="title" placeholder="Name of the product" type="text" alt="" onChange={handleChange}></input>}
                        {language === "FR" && <input name="title" placeholder="Nom du produit" type="text" alt="" onChange={handleChange}></input>}
                        {language === "ES" && <input name="title" placeholder="Nombre del producto" type="text" alt="" onChange={handleChange}></input>}
                    </div>
                    <div>
                        {language === "EN" &&<label>Description</label>}
                        {language === "FR" &&<label>Description</label>}
                        {language === "ES" &&<label>Descripción</label>}
                        
                        {language === "EN" && <textarea name="description" placeholder="Description of the product" type="text" alt="" onChange={handleChange}></textarea>}
                        {language === "FR" && <textarea name="description" placeholder="Description du produit" type="text" alt="" onChange={handleChange}></textarea>}
                        {language === "ES" && <textarea name="description" placeholder="Descripción del producto" type="text" alt="" onChange={handleChange}></textarea>}
                    </div>
                    {language === "EN" && <div>
                      <label>Category</label>
                        <select name="category" onChange={handleChange}>
                                <option value="">Select a category</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Home">Home</option>
                                <option value="Baby">Baby</option>
                                <option value="Accessories">Accessories</option>
                        </select>
                    </div>}
                    {language === "FR" && <div>
                      <label>Category</label>
                        <select name="category" onChange={handleChange}>
                                <option value="">Selectionner une categorie</option>
                                <option value="Men">Homme</option>
                                <option value="Women">Femme</option>
                                <option value="Home">Maison</option>
                                <option value="Baby">Enfant</option>
                                <option value="Accessories">Accessoire</option>
                        </select>
                    </div>}
                    {language === "ES" && <div>
                      <label>Category</label>
                        <select name="category" onChange={handleChange}>
                                <option value="">Elegir categoría</option>
                                <option value="Men">Hombres</option>
                                <option value="Women">Mujeres</option>
                                <option value="Home">Hogar</option>
                                <option value="Baby">Niños</option>
                                <option value="Accessories">Accesorios</option>
                        </select>
                    </div>}
                    <div>
                       {language === "EN" &&  <label>Price</label>}
                       {language === "FR" &&  <label>Prix</label>}
                       {language === "ES" &&  <label>Precio</label>}
                        <input name="price" type="number" alt=""  placeholder="$00.00" onChange={handleChange}></input>
                    </div>
                    <div>
                        {language === "EN" && <label>State</label>}
                        {language === "FR" && <label>Etat</label>}
                        {language === "ES" && <label>Estado</label>}
                        
                        {language ==="EN" && <input name="state" placeholder="ex: Good" type="text" alt="" onChange={handleChange}></input>}
                        {language ==="FR" && <input name="state" placeholder="ex: Bon" type="text" alt="" onChange={handleChange}></input>}
                        {language ==="ES" && <input name="state" placeholder="ex: Buen estado" type="text" alt="" onChange={handleChange}></input>}
                      
                    </div>
                    <div>
                       { language === "EN" && <label>Brand</label>}
                       { language === "FR" && <label>Marque</label>}
                       { language === "ES" && <label>Marca</label>}
                        <input name="brand" placeholder="ex: Zara" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        { language === "EN" && <label>Size</label>}
                        { language === "FR" && <label>Taille</label>}
                        { language === "ES" && <label>Tamaño</label>}
                        <input name="size" placeholder="ex: L" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    <div>
                        {language === "EN" && <label>Color</label>}
                        {language === "FR" && <label>Couleur</label>}
                        {language === "ES" && <label>Color</label>}
                    
                        {language === "EN" && <input name="color" placeholder="ex: Blue" type="text" alt="" onChange={handleChange}></input>}
                        {language === "FR" && <input name="color" placeholder="ex: Bleu" type="text" alt="" onChange={handleChange}></input>}
                        {language === "ES" && <input name="color" placeholder="ex: Azul" type="text" alt="" onChange={handleChange}></input>}
                    </div>
                    <div>
                        { language === "EN" && <label>Country</label>}
                        { language === "FR" && <label>Pays</label>}
                        { language === "ES" && <label>País</label>}
                        <input name="country" placeholder="ex: France" type="text" alt="" onChange={handleChange}></input>
                    </div>
                    {language === "EN" && <button type="submit" className="addProductButton">ADD A PRODUCT</button>}
                    {language === "FR" && <button type="submit" className="addProductButton">AJOUTER UN PRODUIT</button>}
                    {language === "ES" && <button type="submit" className="addProductButton">CREAR PRODUCTO</button>}

                    {language === "EN" && <button className="deleteProductButton" onClick={handleDelete}>DELETE PRODUCT</button>}
                    {language === "FR" && <button className="deleteProductButton" onClick={handleDelete}>EFFACER LE PRODUIT</button>}
                    {language === "ES" && <button className="deleteProductButton" onClick={handleDelete}>ELIMINAR PRODUCTO</button>}
                </form>
            </div>
        </div>
    );
  }
   
  export default EditProjectPage;