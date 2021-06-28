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
    }, [])


    function showSearch() {
        console.log('show search');
    }



    function populateList() {
        console.log("populate list ran");
        console.log(searchList)

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
        <div className="searchHistoryContainer">



            <div onLoad={populateList()} className="searchItems">

            </div>



        </div>
    )
}

export default SearchHistory;