import "./ReviewsTab.css"

import { useNavigate } from "react-router-dom"

function ReviewsTab({reviews}) {

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
                <p>This member has no reviews yet</p>
            </div>
        
            }
        </>
    )
}

export default ReviewsTab