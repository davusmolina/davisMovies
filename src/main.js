const API_URL = 'https://api.themoviedb.org/3';

//Funciones que generan nodos

function generateMovie(parent, movie) {
	let div = document.createElement('div');
	div.setAttribute('class', 'movie-container');
	let img = document.createElement('img');
	img.setAttribute('class', 'movie-img');
	img.setAttribute('alt', movie.title);
	img.setAttribute(
		'src',
		'https://image.tmdb.org/t/p/w300' + movie.backdrop_path
	);

	div.appendChild(img);
	parent.appendChild(div);
}

function generateCategories(parent, genre) {
	let div = document.createElement('div');
	div.setAttribute('class', 'categorie-container');

	let a = document.createElement('a');
	a.setAttribute('src', '');
	a.innerText = genre.name;

	let h3 = document.createElement('h3');
	h3.setAttribute('class', 'category-title');
	h3.setAttribute('id', 'id' + genre.id);

	h3.appendChild(a);
	div.appendChild(h3);
	parent.appendChild(div);
}

// trabajando con axios
const api_axios = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	params: {
		api_key: API_KEI,
	},
	headers: {
		'Content-Type': 'application/json;charset=utf8',
	},
});

//Funciones que obtienen los datos y agregan los nodos
async function getMoviesTrendingPreview() {
	const res = await fetch(API_URL + '/trending/movie/day?api_key=' + API_KEI);
	const data = await res.json();
	const results = data.results;
	console.log(results);

	trendingMoviesPreviewList.innerHTML = '';
	results.forEach((movie) => {
		generateMovie(trendingMoviesPreviewList, movie);
	});
}

async function getCategoriesPreview() {
	const { data } = await api_axios('/genre/movie/list');
	const genres = data.genres;

	categoriesPreviewList.innerText = '';
	genres.forEach((genre) => {
		generateCategories(categoriesPreviewList, genre);
	});
}
