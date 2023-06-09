// Global Constants
const api_key = "28ea94cca76765ee8f74b3f4ee0f374a";
var page = 1;
const baseURL = 'https://api.themoviedb.org/3';
const display = document.querySelector("#movies-grid");
const loadButton = document.querySelector("#load-more-movies-btn");
const newLoad = document.querySelector(".loading_2");
const search_input = document.getElementById("search-input");
const search_form = document.getElementById("searchForm");
const x_button = document.getElementById("close-search-btn");
const label = document.getElementById("label");
const body = document.querySelector("body");
const poster = document.querySelector(".image");

/**
 *
 * Update the DOM to display results from the Giphy API query.
 *
 * @param {Object} results - An array of results containing each item
 *                           returned by the response from the Giphy API.
 *
 */
function displayResults(results) {
    display.innerHTML += `
        <div class="movie-card">
            <img class="movie-poster" src="https://image.tmdb.org/t/p/w342${results.poster_path}" alt="${results.original_title}">
            
                <p class="movie-voting"> <span class="star">&#11088</span> <span class="rating">${results.vote_average}</span></p>
                <h4 class="movie-title">${results.original_title}</h4>
        </div>
        `;
}

function xAppear() {
    if(x_button.classList.contains("hide") === true) {
        x_button.classList.remove("hide");
    }
    loadButton.classList.add("hide");
}

//Now Playing
/**
 * Make the actual `fetch` request to the Movie API
 * and appropriately handle the response.
 */
async function getMovieApiResults() {
    const fetchURL = `${baseURL}/movie/now_playing?api_key=${api_key}&page=${page}`;
    const response = await fetch(fetchURL);
    const data = await response.json();
    data.results.forEach(element => {
        displayResults(element);
    });
    
}

//Search Query
/**
 * Make the actual `fetch` request to the Movie API
 * and appropriately handle the response.
 */
async function getSearchMovieApiResults(searchTerm) {
    const fetchURL = `${baseURL}/search/movie?api_key=${api_key}&query=${searchTerm}&page=${page}`;
    const response = await fetch(fetchURL);
    const data = await response.json();
    data.results.forEach(element => {
        displayResults(element);
    });
    label.innerText = `Searching "${searchTerm}"`;
    console.log(data.results);
    
}

//Now Playing
/**
 * Make the actual `fetch` request to the Movie API
 * and appropriately handle the response.
 */
async function getMovieApiResults() {
    const fetchURL = `${baseURL}/movie/now_playing?api_key=${api_key}&page=${page}`;
    const response = await fetch(fetchURL);
    const data = await response.json();
    data.results.forEach(element => {
        displayResults(element);
    });
    
}
/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
function xButtonWorking() {
    page = 1;
    display.innerHTML = '';
    getMovieApiResults();
    x_button.classList.add("hide");
    label.innerText = "Now Playing";
    if(loadButton.classList.contains("hide") === true) {
        loadButton.classList.remove("hide");
    }
    if(newLoad.classList.contains("hide") === false) {
        newLoad.classList.add("hide");
    }
}

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleSearch(event) {
    page = 1;
    event.preventDefault();
    display.innerHTML = '';
    getSearchMovieApiResults(search_input.value);
    newLoad.classList.remove("hide");
}

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleSearchShowMore(event) {
    page += 1;
    event.preventDefault();
    getSearchMovieApiResults(search_input.value);
    //console.log(fetchURL);
    //console.log(page);
}

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleShowMore(event) {
    page += 1;
    event.preventDefault();
    getMovieApiResults();
    //console.log(fetchURL);
    console.log(page);
}

window.onload = function () {
    newLoad.classList.add("hide");
    getMovieApiResults();
    loadButton.addEventListener("click", handleShowMore);
    //search_input.addEventListener("click", xAppear);
    search_form.addEventListener("submit", handleSearch);
    search_form.addEventListener("submit", xAppear);
    x_button.addEventListener("click", xButtonWorking);
    newLoad.addEventListener("submit", handleSearchShowMore);

}
