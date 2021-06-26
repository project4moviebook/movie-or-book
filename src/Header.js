
// Our header for our webpage

const Header = function (props) {

    return (
        <header className="App-header">
            <h1>Is The Book Better?</h1>
            <form onSubmit={(e) => props.search(e)} action="">
                <label className="sr-only" htmlFor="submit">Enter a Movie/Book</label>
                <input type="text" name="submit" id="submit" placeholder="Enter a Movie/Book" />
                <input type="submit" value="Submit" />

            </form>
        </header>
    )
}



export default Header;