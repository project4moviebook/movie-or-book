import { useEffect, useState, createRef } from 'react';
import './App.css';
import Header from './Header';
import Instructions from './Instructions';
import MainContent from './MainContent';


// https:api.themoviedb.org/3/movie/550?api_key=3951aaaa350c1d4bbe3275a095820e70

function App() {

  // search function 
  const search = (searchQuery) => {
    searchQuery.preventDefault();
    setUserSearch(searchQuery.target[0].value)
    // searchQuery.target[0].value ? setUserSearch(searchQuery.target[0].value) : setUserSearch("Harry Potter");
  }

  const scrollDiv = createRef();

  // function used to scroll down to main content 

  const scrollSmoothHandler = () => {
    scrollDiv.current.scrollIntoView({ behavior: "smooth", block: "end" }); //function behaviour is to go smoothly and it ends at the top of the block 
  };



  const [userSearch, setUserSearch] = useState('The Hunger Games');
  const [bookData, setBookData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [castData, setCastData] = useState([]);

  //for testing
  const test = () => {
    console.log(bookData);
    console.log(movieData);
    console.log(imgUrl);
  }

  // Will be used in css for image not found
  // background-image: url("https://islandpress.org/sites/default/files/default_book_cover_2015.jpg");

  // movie/movieid/credits?api_key=3951aaaa350c1d4bbe3275a095820e70

  //use effect to get api data
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=3951aaaa350c1d4bbe3275a095820e70&language=en-US&page=1&include_adult=false&query=${userSearch}`).then((data) => {
      return data.json()
    }).then((jsonData) => {


      // ---------------------

      fetch(`https://api.themoviedb.org/3/movie/${jsonData.results[0].id}/credits?api_key=3951aaaa350c1d4bbe3275a095820e70`).then((data) => {
        return data.json()
      }).then((jsonCastData) => {
        setCastData(jsonCastData);
      })
      // -----------------------

      console.log(jsonData);
      
      setMovieData(jsonData); //passing along the movie data to be used later
      //jsonData return contains a title that is passed on to this fetch call
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${jsonData.results[0].title}&key=AIzaSyBiVci_ifQql4mBeaUVSW6rU6KSmZwukS8`)
        .then(response => response.json())
        .then(result => {
          // console.log(result);

          //response return contains a id that is passed on to this fetch call
          fetch(`https://www.googleapis.com/books/v1/volumes/${result.items[0].id}?key=AIzaSyBiVci_ifQql4mBeaUVSW6rU6KSmZwukS8`)
            .then(response => response.json())
            .then(result => {
              // console.log('after');
              // console.log(result);
              setBookData(result); //passing along the book data to be used later
              setImgUrl(`https://covers.openlibrary.org/b/ISBN/${result.volumeInfo.industryIdentifiers[0].identifier}-L.jpg`);

            })

        })

    });

  }, [userSearch]);

  // test();






  return (
    <div className="App">
      <Header search={search}/>
      {/* <button onClick={>click me!</button> */}
      <main>
        {/* We pass the function used to scroll to main  */}
        <Instructions scrollButton={scrollSmoothHandler} />
        {/* We pass the reference to the div we are trying to scroll too */}
        <MainContent bookInfo={bookData} movieInfo={movieData} imgUrl={imgUrl} scrollTo={scrollDiv} castData={castData} />
      </main>

  </div>
  );
}

export default App;
