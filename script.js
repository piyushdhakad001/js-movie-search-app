

// const API_KEY = '44fd'
async function searchMovie(){
const url = `http://www.omdbapi.com/?t=[inception]&apikey=44fd002 `
const response = await fetch(url);
const data = await response.json();
console.log(data);
}
searchMovie();