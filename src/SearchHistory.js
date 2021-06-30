import firebase from "./firebase";
import { useEffect, useState } from "react";

function SearchHistory(props) {
    const [searchList, setSearchList] = useState([]);

    // Get Firebase Info
    const dbRef = firebase.database().ref();
    useEffect(() => {
        dbRef.on('value', (response) => {
            const newArray = [];
            newArray.push(response.val());
            setSearchList(newArray);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const closeHistory = () => { //Used to hide the search history container
        document.querySelector('.searchHistoryContainer').classList.add('hidden')
    }
    
    const deleteDatabase = () => { // If user clicks trash, empty FireBase
        dbRef.set('')
    }

    function populateList() { // Used to populate search History

        searchList.forEach((value, index) => {
            document.querySelector('.searchItems').innerHTML = ""; //Clears the search Div

            for (let search in value) {
                if (!(search === 'undefined')) { //If item in Firebase contains a key, Undefined, skip the item
                    document.querySelector('.searchItems').innerHTML += `<button class="searchButton"> ${value[search]} </button>`
                }
            }
        })
    }


    return (
        <div className="searchHistoryContainer hidden">

            <span className="iconify" data-icon="noto:worm" data-inline="false"></span>
            <button onClick={closeHistory} className="closeButton"><i className="fas fa-times-circle"></i></button>
            <button onClick={deleteDatabase} className="clearHistory"><i className="fas fa-trash"></i></button>
            <div onLoad={populateList()} className="searchItems"></div>

        </div>
    )
}

export default SearchHistory;