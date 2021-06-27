const MainContent = function (props) {
    let movieObject = {};
    let bookObject = {};
    let castObject = {};
    console.log(props);
    console.log(props);

    try {
        movieObject = {
            path: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${props.movieInfo.results[0].poster_path}`,
            description: props.movieInfo.results[0].overview,
            title: props.movieInfo.results[0].original_title,
            vote: (props.movieInfo.results[0].vote_average / 2).toFixed(2),
            release_date: props.movieInfo.results[0].release_date,
            
        }


        bookObject = {
            description: props.bookInfo.volumeInfo.description,
            author: props.bookInfo.volumeInfo.authors[0],
            vote: props.bookInfo.volumeInfo.averageRating,
            publish_date: props.bookInfo.volumeInfo.publishedDate,
            title: props.bookInfo.volumeInfo.title,
            default: props.defaultImage
        }

        castObject = {
            cast1: props.castData.cast[0].name,
            cast2: props.castData.cast[1].name,
            cast3: props.castData.cast[2].name
        }

    } catch {
    }

    function editText() {
        try {
            const desc = document.querySelector("#bookText");
            desc.innerHTML=bookObject.description;
        } catch {
            
        }
    }

    function fake(para) {

        if (para.target.width == 350 && para.target.height == 350) {
            document.querySelector("#bookImage").src=bookObject.default
        }
        // console.log(para)
        // console.log(para.target.width)
    }

    let winner;

    if (bookObject.vote > movieObject.vote) {
        winner = true;
    } else {
        winner = false;
    }

    // const movieInfo = props.movieInfo;
    // console.log(props.movieInfo.results[0].adult);

    return (
        // this is the div we are trying to scroll too 

        <section className="mainContainer">

            {/* Book Stuff Container */}
            <div className="one">

                <div className="mediaContainer">

                { props.bookNotFound ?
                        <div className="noBook">
                            <p>Book Not Found. Please try another search.</p>
                        </div>: <div className="imageContainer poster">
                        <img id="bookImage" onLoad={(e)=>{fake(e)}} src={props.imgUrl} alt="" />
                        <div className="voteIcon">
                            <p>{bookObject.vote}/5</p>
                        </div>
                        {winner ? <div className="winnerIcon">
                        <img src="https://www.pngkit.com/png/full/0-3147_award-winning-png-transparent-image-bs-group.png"/>
                        </div> : null}
                    </div>}

                    {props.bookNotFound ? "" : <div className="description">
                        <h2 className="header">{bookObject.title}</h2>
                        <p id="bookText" onLoad={editText()}>{bookObject.description}</p>
                        <p>Author: {bookObject.author}</p>
                        <p>{bookObject.publish_date}</p>
                    </div>}
                    
                
                </div>

            </div>


            {/* Movie Stuff Container */}
            <div className="two">

                <div className="mediaContainer">
                    <div className="imageContainer poster">
                        <img src={movieObject.path} alt="" />
                        <div className="voteIcon">
                            <p>{movieObject.vote}/5</p>
                        </div>
                        {!winner ? <div className="winnerIcon">
                        <img src="https://www.pngkit.com/png/full/0-3147_award-winning-png-transparent-image-bs-group.png"/>
                        </div> : null}
                    </div>

                    <div className="description">
                        <h2 className="header">{movieObject.title}</h2>
                        <p>{movieObject.author}</p>
                        <p>{movieObject.description}</p>
                        <p>Starring: {castObject.cast1}, {castObject.cast2}, and {castObject.cast3}</p>
                        <p>{movieObject.release_date}</p>
                    </div>
                </div>


            </div>




            {/* <div className="three"><p className="test">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ex, earum sapiente reiciendis consequatur veritatis, natus nostrum totam consequuntur neque accusantium labore sint delectus deserunt.</p>
            </div> */}
            
        </section>
    )
}

export default MainContent;