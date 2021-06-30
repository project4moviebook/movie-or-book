import { useEffect, useState, createRef } from 'react';
import './App.css';
import Header from './Header';
import Instructions from './Instructions';
import MainContent from './MainContent';
import SearchHistory from './SearchHistory';
import Footer from "./Footer";

function App() {

  // search function 
  const search = (searchQuery) => {
    searchQuery.preventDefault();
    setUserSearch(searchQuery.target[0].value)
  }

  // function used to scroll down to main content 
  const scrollDiv = createRef();
  const scrollSmoothHandler = () => {
    scrollDiv.current.scrollIntoView({ behavior: "smooth", block: "start" }); // function behaviour is to go smoothly and it ends at the top of the block 
  };

  const [userSearch, setUserSearch] = useState('The Hunger Games');
  const [bookData, setBookData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [castData, setCastData] = useState([]);
  const [defaultImage, setDefaultImage] = useState("");
  const [bookNotFound, setBookNotFound] = useState(false); 
  const [failedSearch, setFailedSearch] = useState(false);

  //use effect to get api data
  useEffect(() => {
    // First API used to get data from the movie database using the user's search
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=3951aaaa350c1d4bbe3275a095820e70&language=en-US&page=1&include_adult=false&query=${userSearch}`).then((data) => {
      return data.json()
    }).then((jsonData) => {

      try {
        // Second API used to get more specific information
        fetch(`https://api.themoviedb.org/3/movie/${jsonData.results[0].id}/credits?api_key=3951aaaa350c1d4bbe3275a095820e70`).then((data) => {
          return data.json()
        }).then((jsonCastData) => { 
          setCastData(jsonCastData); //Cast data to be used
        })

        setMovieData(jsonData); //Final movie data to be used

        //jsonData return contains a title that is passed on to this fetch call to retrieve book information
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${jsonData.results[0].title}&key=AIzaSyBiVci_ifQql4mBeaUVSW6rU6KSmZwukS8`)
          .then(response => response.json())
          .then(result => {

            setBookData(result.items[0]); //Book data to be used

            try { //Try to set image URL
              setImgUrl(`https://covers.openlibrary.org/b/ISBN/${result.items[0].volumeInfo.industryIdentifiers[0].identifier}-L.jpg`);
              
            } catch {
            }

            try { //Try to set default image
              setDefaultImage(result.items[0].volumeInfo.imageLinks.thumbnail)
              
            } catch { //If fails, assume book not found, and set to true
              setBookNotFound(true);
            }

          })

        //Return to default
        setBookNotFound(false)
        setFailedSearch(false)

      } catch { //If first API fails, assume search to be invalid
        setFailedSearch(true)
      }

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSearch]); //Only activate API call once search has been changed


  // Use Effect used to add event listeners
  useEffect(() => {
    window.addEventListener('click', (e) => { 
      // Adding click event listener
      if (e.target.parentNode.className === 'searchButton') { // If user clicks on an image with the class name "searchButton"
        setUserSearch(e.target.className);
      } else if (e.target.className === 'searchButton') { // If user clicks on a button with the class name "searchButton"
        setUserSearch(e.target.firstElementChild.className);
      }
    })
  }, [])
  

  // Used to display everything on the screen
  return (
    <div className="App">
      <Header search={search} />
      <main className="wrapper">
        {/* We pass the function used to scroll to main  */}
        {failedSearch ? null : <Instructions scrollButton={scrollSmoothHandler} />}
        {/* We pass the reference to the div we are trying to scroll too */}
        <div ref={scrollDiv} className="blankDiv"></div>
        {failedSearch ? <div><p>Search Failed. Please try again.</p><img src="https://www.vippng.com/png/detail/209-2093020_png-file-search-error-icon.png" alt="Search Failed. Please try again"/></div> : <MainContent search={userSearch} bookInfo={bookData} movieInfo={movieData} imgUrl={imgUrl} scrollTo={scrollDiv} castData={castData} defaultImage={defaultImage} bookNotFound={bookNotFound} />}
      </main>
      <SearchHistory />
      <Footer />

    </div>
  );
}

export default App;
