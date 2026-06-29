const searchButton = document.querySelector(".search");
const input = document.querySelector(".input");
const container = document.querySelector(".container");
const movieContainer = document.querySelector(".movie-container");
const loading = document.querySelector(".loading");
const loadingPara = document.createElement("p");


const movieDiv = document.createElement("div");
const movieName = document.createElement("p");
const movieRatings = document.createElement("p");
const movieDuration = document.createElement("p");
const movieDirector = document.createElement("p");
const movieWriter = document.createElement("p");
const movieStars = document.createElement("p");
const movieGenre = document.createElement("p");
const moviePlot = document.createElement("p");

let lastMovieDetails = localStorage.getItem("data");
let lastMovieName = localStorage.getItem("movie");

function loadingAPI(){
  
loadingPara.textContent = 'Movie fetching.....';
loading.appendChild(loadingPara);
movieContainer.prepend(loading);

}
last();

function render(data) {
  movieDiv.innerHTML = "";
  loading.textContent = '';
  movieName.textContent = `${data.Title}, (${data.Year}) on IMDB`;
  movieRatings.textContent = `☆ ${data.Ratings[0].Value}`;
  movieDuration.textContent = `Duration..... ${data.Runtime}`;
  movieDirector.textContent = `Director..... ${data.Director}`;
  movieWriter.textContent = `Writer....... ${data.Writer}`;
  movieStars.textContent = `Stars........ ${data.Actors}`;
  movieGenre.textContent = `Genre........ ${data.Genre}`;
  moviePlot.textContent = `Plot......... ${data.Plot}`;

  movieDiv.appendChild(movieName);
  movieDiv.appendChild(movieRatings);
  movieDiv.appendChild(movieDuration);
  movieDiv.appendChild(movieDirector);
  movieDiv.appendChild(movieWriter);
  movieDiv.appendChild(movieStars);
  movieDiv.appendChild(movieGenre);
  movieDiv.appendChild(moviePlot);
  movieContainer.appendChild(movieDiv);
};

document.addEventListener("keydown", (e) => {
 
  if (e.key === "Enter") {
     loadingAPI();
    fetchData();
  }
});
searchButton.addEventListener("click", async () => {
   loadingAPI();
  fetchData();
});
async function fetchData() {
   if(input.value === ''){
    loadingPara.textContent = '';
    alert("Enter movie name")
    return
  }
  const movie = input.value.trim();
  if (!movie) return;
  

  const url = `http://www.omdbapi.com/?t=${movie}&apikey=44fd002 `;

  const response = await fetch(url);
  const data = await response.json();

  if(data.Response === "False"){
    loadingPara.textContent = '';
    alert('Movie not found!')
    return;
  }

  localStorage.setItem("movie", movie);
  localStorage.setItem("data", JSON.stringify(data));

  render(data);
};

async function last() {
  let movie = "";
  if (lastMovieName) {
    input.value = lastMovieName;
    const savedMovieDetails = JSON.parse(lastMovieDetails);
    render(savedMovieDetails);
    return;
  }
};

