import firebase from "./firebase";
import { useEffect, useState } from "react";

function SearchHistory(props) {
    const [searchList, setSearchList] = useState([]);


    const dbRef = firebase.database().ref();
    useEffect(() => {
        dbRef.on('value', (response) => {
            const newArray = [];
            newArray.push(response.val());
            setSearchList(newArray);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const closeHistory = () => {
        document.querySelector('.searchHistoryContainer').classList.add('hidden')
    }
    
    const deleteDatabase = () => {
        dbRef.set('')
    }

    function populateList() {

        // let count = 0;
        // console.log(searchList[0]);
        searchList.forEach((value, index) => {
            document.querySelector('.searchItems').innerHTML = "";
            // if (searchList.length > 6) {
            //     console.log('more then 6 items');
            // }

            for (let search in value) {
                if (!(search === 'undefined')) {
                    document.querySelector('.searchItems').innerHTML += `<button class="searchButton"> ${value[search]} </button>`
                }
            }
        })
        // setTimeout(() => { document.querySelector('.searchItems').innerHTML += searchList[0].book1 }, 5000)

    }


    return (
        <div className="searchHistoryContainer hidden">

            <span className="iconify" data-icon="noto:worm" data-inline="false"></span>
            <button onClick={closeHistory} className="closeButton"><i className="fas fa-times-circle"></i></button>
            <button onClick={deleteDatabase} className="clearHistory"><i className="fas fa-trash"></i></button>
            
            <div onLoad={populateList()} className="searchItems">
                

            </div>
            


        </div>
    )
}

export default SearchHistory;