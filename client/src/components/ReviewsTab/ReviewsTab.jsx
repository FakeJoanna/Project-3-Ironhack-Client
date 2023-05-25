import "./ReviewsTab.css"

function ReviewsTab({reviews}) {

    const review1 = {
        img: ["https://lottserves.org/wp-content/uploads/2017/10/500x500.png", "https://lottserves.org/wp-content/uploads/2017/10/500x500.png", "https://lottserves.org/wp-content/uploads/2017/10/500x500.png", "https://lottserves.org/wp-content/uploads/2017/10/500x500.png"],
        title: "Great experience!",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }

    const review2 = {
        img: ["https://lottserves.org/wp-content/uploads/2017/10/500x500.png", "https://lottserves.org/wp-content/uploads/2017/10/500x500.png", "https://lottserves.org/wp-content/uploads/2017/10/500x500.png", "https://lottserves.org/wp-content/uploads/2017/10/500x500.png"],
        title: "Horrible experience!",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }

    reviews = [review1, review2]

    return(
        <>
            {reviews
            
            ?

            reviews.map(review => {
                return(
                    <>
                        <div key={review._id} className="reviewDiv">
                            <div className="reviewerDiv">
                                <div>
                                    <img src="https://www.vinted.es/assets/no-photo/user-empty-state.svg" alt="" />
                                </div>
                                <div className="usernameStarsDiv">
                                    <p>username</p>
                                    <p>stars</p>
                                </div>
                            </div>
                            <div className="reviewTextDiv">
                                <h4>{review.title}</h4>
                                <p>{review.message}</p>
                            </div>
                            <div className="reviewImagesDiv">
                                {review.img.map(image => {
                                    return(
                                        <img src={image} alt="" />
                                    )
                                })}
                            </div>
                        </div>
                        <hr className="reviewDivider"/>
                    </>
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