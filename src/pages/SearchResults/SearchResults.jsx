import "./SearchResults.css"

import axios from "axios"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import ProductCard from "../../components/ProductCard/ProductCard"

const API_URL = "http://localhost:5005"

function SearchResults() {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get("q")
    const [products, setProducts] = useState([])

    useEffect(() => {
        if(!searchQuery) {
            return
        }
        axios.get(`${API_URL}/api/search?q=${searchQuery}`)
        .then((response) => {
            setProducts(response.data)
        })
    }, [searchQuery])

    return(
        <div className="searchResultsPageDiv">
            <div className="searchResultsWrapper">
                {products.map(product => {
                    return(
                        <ProductCard key={product._id} product={product}/>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchResults