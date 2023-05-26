import "./ReviewsTab.css"

import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { LanguageContext } from "../../context/lang.context" 

function ReviewsTab({reviews}) {
    
    const { language } = useContext(LanguageContext)

    const navigate = useNavigate()
    function takeToReviewerAccount(id) {
        navigate(`/member/${id}`)
    }

    return(
        <>
            {reviews
            
            ?

            reviews.map(review => {
                return(
                    <div className="reviewWrapper">
                        <div key={review._id} className="reviewDiv">
                            <div className="reviewerDiv" onClick={() => takeToReviewerAccount(review.userReviewing._id)}>
                                <div>
                                    <img src={review.userReviewing.profilePicture} alt="" />
                                </div>
                                <p>{review.userReviewing.name}</p>
                            </div>
                            <div className="reviewTextDiv">
                                <p>{review.reviewText}</p>
                            </div>
                        </div>
                        <div className="reviewDivider"></div>
                    </div>
                )
            })

            :

            <div className="noReviewsDiv">
                <img src="https://cdn3.iconfinder.com/data/icons/sympletts-free-sampler/128/star-512.png" alt="" />
               {language === "EN" && <p>This member has no reviews yet.</p>}
               {language === "FR" && <p>Cet utilisateur n'as pas de commentaires.</p>}
               {language === "ES" && <p>Este usuario no tiene reseñas.</p>}
            </div>
        
            }
        </>
    )
}

export default ReviewsTab