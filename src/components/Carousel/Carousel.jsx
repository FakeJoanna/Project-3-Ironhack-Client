import "./Carousel.css"

function Carousel({images}) {

    const carouselImages = document.getElementsByClassName("carouselImage")

    function toggleImage(direction) {
        const activeImage = document.querySelector(`[data-status="active"]`)
        const currentIndex = parseInt(activeImage.getAttribute("data-index"))
        let nextIndex
        if(direction === "left") {
            nextIndex = currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1
            const nextImage = document.querySelector(`[data-index="${nextIndex}"]`)
            activeImage.setAttribute("data-status", "after")
            nextImage.setAttribute("data-status", "becoming-active-from-left")
            setTimeout(() => {
                nextImage.setAttribute("data-status", "active")
            }, 10);

        }
        else if (direction === "right") {
            nextIndex = currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1
            const nextImage = document.querySelector(`[data-index="${nextIndex}"]`)
            activeImage.setAttribute("data-status", "before")
            nextImage.setAttribute("data-status", "becoming-active-from-right")
            setTimeout(() => {
                nextImage.setAttribute("data-status", "active")
            }, 10);
        }
    }

    return(
        
        <div className="carouselDiv">

            {images.length === 1
            
            ?
            
            <img src={images[0]} className="carouselImage" alt="" />

            :

            <>
                <button className="carouselLeft" onClick={() => toggleImage("left")}>
                    <svg height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 50 50" enableBackground="new 0 0 50 50">
                            <path fill="#231F20" d="M15.563,40.836c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l15-15
                            c0.391-0.391,0.391-1.023,0-1.414l-15-15c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l14.293,14.293L15.563,39.422
                            C15.172,39.813,15.172,40.446,15.563,40.836z"/>
                    </svg>
                </button>
                {images.map((image, index) => {
                    const status = index === 0 ? "active" : "unknown"
                    return(
                        <img key={index} className="carouselImage" data-index={`${index}`} data-status={status} src={image} alt="" />
                    )
                })}
                <button className="carouselRight" onClick={() => toggleImage("right")}>
                    <svg height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 50 50" enableBackground="new 0 0 50 50">
                        <path fill="#231F20" d="M15.563,40.836c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l15-15
                        c0.391-0.391,0.391-1.023,0-1.414l-15-15c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l14.293,14.293L15.563,39.422
                        C15.172,39.813,15.172,40.446,15.563,40.836z"/>
                    </svg>
                </button>
            </>

            }

            
    
        </div>

       
    )
}

export default Carousel