// Global Constants
const api_key = "28ea94cca76765ee8f74b3f4ee0f374a";
var page = 1;
const baseURL = 'https://api.themoviedb.org/3';
const display = document.querySelector("#display");
const loadButton = document.querySelector(".loading");
const search_input = document.getElementById("search-input");
const x_button = document.getElementById("x-button");

/**
 * $page=
 * Update the DOM to display results from the Giphy API query.
 *
 * @param {Object} results - An array of results containing each item
 *                           returned by the response from the Giphy API.
 *
 */
function displayResults(results) {
    display.innerHTML += `
        <div class="all">
            <img class="image" src="https://image.tmdb.org/t/p/w342${results.poster_path}" alt="${results.original_title}">
            <div class="description">
                <p class="all"> <span class="star">&#11088</span> <span class="rating">${results.vote_average}</span></p>
                <h4 class="name">${results.original_title}</h4>
            </div>
        </div>
        `;
}

function xAppear() {
    if(x_button.classList.contains("hide") === true) {
        x_button.classList.remove("hide");
    }
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
async function handleShowMore(event) {
    page += 1;
    event.preventDefault();
    getMovieApiResults();
    //console.log(fetchURL);
    console.log(page);
}

window.onload = function () {
    getMovieApiResults();
    loadButton.addEventListener("submit", handleShowMore);
    search_input.addEventListener("click", xAppear);
}
