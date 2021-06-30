import firebase from "./firebase";

const MainContent = function (props) {
    // Initialized object for information
    let movieObject = {};
    let bookObject = {};
    let castObject = {};

    try { // Setting information
        movieObject = {
            path: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${props.movieInfo.results[0].poster_path}`,
            description: props.movieInfo.results[0].overview,
            title: props.movieInfo.results[0].title,
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

    function editText() { //Used to display the search info due to API return containing HTML elements. Function runs on load
        try {
            const desc = document.querySelector("#bookText");
            desc.innerHTML = bookObject.description;
        } catch {

        }
    }

    function checkIfBlank(para) { //Checking if OpenLibrary returned an image that is their default blank and if true, setting to the original image from the Google Books API

        if (para.target.width === 250 && para.target.height === 350) {
            document.querySelector("#bookImage").src = bookObject.default
        }

    }

    let winner; //Create empty bool

    if (bookObject.vote > movieObject.vote) { //Setting bool to true or false, depending on results
        winner = true;
    } else {
        winner = false;
    }

    try { // Attempt to upload to FireBase, if fails, the title contains an invalid character that Firebase doesn't accept
        firebase.database().ref().child(`${movieObject.title}`).set(`<img class="${movieObject.title}" src=${movieObject.path} alt="The poster for ${movieObject.title}" />`);
    } catch {

    }

    return (
        // this is the div we are trying to scroll too 

        <section className="mainContainer">

            {/* Book Stuff Container */}
            <div className="one">

                <div className="mediaContainer">

                    {props.bookNotFound ?
                        <div className="noBook">
                            <p>Book Not Found. Please try another search.</p>
                        </div> : <div className="imageContainer poster">
                            <img id="bookImage" onLoad={(e) => { checkIfBlank(e) }} src={props.imgUrl} alt={`The book cover of ${bookObject.title}.`} />
                            <div className="voteIcon">
                                <p>{bookObject.vote}/5</p>
                            </div>
                            {winner ? <div className="winnerIcon">
                                <img src="https://www.pngkit.com/png/full/0-3147_award-winning-png-transparent-image-bs-group.png" alt={`Winner icon for the${bookObject.title} book.`} />
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
                        <img className={movieObject.title} src={movieObject.path} alt={`The poster for ${movieObject.title}.`} />
                        <div className="voteIcon">
                            <p>{movieObject.vote}/5</p>
                        </div>
                        {!winner ? <div className="winnerIcon">
                            <img src="https://www.pngkit.com/png/full/0-3147_award-winning-png-transparent-image-bs-group.png" alt={`Winner icon for the ${movieObject.title} movie.`} />
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

        </section>
    )
}

export default MainContent;