const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
    try {
        const myAPIKey = "d4fe3662";
        const url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch movie data.");
        }

        const data = await response.json();

        showMovieData(data);
    } catch (error) {
        showErrorMessage("No Movie Found!!!");
    }
}

// Function to show movie data on screen
const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');

    // Use Destructuring assignment to extract properties from data object
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                             <p><strong>Duration: </strong>${Runtime}}</p>
                             <p><strong>Cast: </strong>${Actors}</p>
                             <p><strong>Plot: </strong>${Plot}</p>`;

    // Creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}
// Function to display error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}

// Function to handle form submission
const handleFormSubmission = (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        showErrorMessage("Fetching Movie Information...");
        getMovieInfo(movieName);
    }
    else {
        showErrorMessage("Enter movie name to get movie information");
    }
}

// Adding event listener to search form
searchForm.addEventListener('submit', handleFormSubmission);
