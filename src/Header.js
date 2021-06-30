
// Our header for our webpage

const Header = function (props) {

    const displayHistory = () => { //Used to show the history popup
        document.querySelector('.searchHistoryContainer').classList.remove('hidden')
    }

    return (
        <header>
            <div className="wrapper appHeader">
                <h1>Is The Book Better?</h1>
                <div className="searchButtons">
                    <form onSubmit={(e) => props.search(e)} action="">
                        <label className="sr-only" htmlFor="submit">Enter a Movie/Book</label>
                        <input type="text" name="submit" id="submit" placeholder="Enter a Movie/Book" />
                        <input onClick={props.scrollButton} type="submit" value="Submit" />
                    </form>
                    <button onClick={displayHistory} id="historyButton" className="instructionsButton2"><i className="fas fa-list-alt"></i> Search History</button>
                </div>
            </div>
        </header>
    )
}


export default Header;