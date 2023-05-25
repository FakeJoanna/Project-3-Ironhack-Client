import { Link } from "react-router-dom"
import "./SearchPreview.css"

function SearchPreview({ data }) {
  
  return (
    <div className="searchPreviewDiv">
      {data[0].name ?
      
      data.map(user => {
        return(
          <Link key={user._id} className="previewLink" to={`/member/${user._id}`}>
            <div className="previewDiv">
              <div className="previewImageDiv">
                <img src={user.profilePicture} alt="" className="previewImage"/>
              </div>
              <div className="previewTitleDiv">
                {user.name}
              </div>
              <div className="previewDescriptionDiv">
                {/* Nothing to display here yet */}
              </div>
            </div>
            <hr className="previewDivDivider"/>
          </Link>
        )
      })

      :
      
      data.map(product => {
        return(
          <Link key={product._id} className="previewLink" to={`/product/${product._id}`}>
            <div className="previewDiv">
              <div className="previewImageDiv">
                <img src={product.img[0]} alt="" className="previewImage"/>
              </div>
              <div className="previewTitleDiv">
                {product.title}
              </div>
              <div className="previewDescriptionDiv">
                {product.description}
              </div>
            </div>
          <hr className="previewDivDivider"/>
          </Link>
        )
      })

      }
    </div>
  )
}

export default SearchPreview