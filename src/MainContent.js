const MainContent = function (props) {
    let movieObject = {};
    let bookObject = {};
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
        }
    } catch {
    }


    // const movieInfo = props.movieInfo;
    // console.log(props.movieInfo.results[0].adult);

    return (
        // this is the div we are trying to scroll too 

        <section ref={props.scrollTo} className="mainContainer">

            {/* Book Stuff Container */}
            <div className="one">
                <div >
                    <h2>{bookObject.title}</h2>
                    <div className="imageContainer">
                        <img src={props.imgUrl} alt="" />
                        <div className="voteIcon">
                            <p>{bookObject.vote}/5</p>
                        </div>
                    </div>
                </div>
                <div className="objectDescriptions">

                    <p>{bookObject.author}</p>
                    <p>{bookObject.description}</p>
                    <p>{bookObject.publish_date}</p>
                </div>

            </div>


            {/* Movie Stuff Container */}
            <div className="two">
                <div>
                    <h2>{movieObject.title}</h2>
                    <div className="imageContainer">
                        <img src={movieObject.path} alt="" />
                        <div className="voteIcon">
                            <p >{movieObject.vote}/5</p>

                        </div>
                    </div>
                </div>

                <div className="objectDescriptions">

                    <p>{movieObject.author}</p>
                    <p>{movieObject.description}</p>
                    <p>{movieObject.release_date}</p>
                </div>


            </div>




            {/* FireBase Stuff Container */}
            <div className="three"><p className="test">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ex, earum sapiente reiciendis consequatur veritatis, natus nostrum totam consequuntur neque accusantium labore sint delectus deserunt.</p>
            </div>

        </section>
    )
}

export default MainContent;