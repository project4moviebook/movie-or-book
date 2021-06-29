const Instructions = function (props) {
    return (
        <div className="instructionsContainer">
            <div className="hero"></div>
            <div className="instructionsInnerContainer">
                <h2>Welcome</h2>
                <p>Search for a book or movie to answer the age-old question, "Is The Book Better?". With your search query, we will compare both the book and the movie results based on their individual ratings respectively, using information gathered from the <a href="https://developers.google.com/books/docs/v1/using">Google Books</a> and <a href="https://developers.themoviedb.org/3">The Movie Database</a>. </p>
                <div className="instructionsDiv">
                    {/* used to scroll down to main on click */}
                    <button onClick={props.scrollButton} className="instructionsButton">Continue</button>
                </div>
                <i className="fas fa-cookie-bite cookie"></i>
            </div>
        </div>
    )
}

export default Instructions;