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
	div.addEventListener('click', () => {
		location.hash = '#movie=' + movie.id;
	});
	parent.appendChild(div);
}

function generateCategories(parent, genre) {
	let div = document.createElement('div');
	div.setAttribute('class', 'categorie-container');

	let h3 = document.createElement('h3');
	h3.setAttribute('class', 'category-title');
	h3.setAttribute('id', 'id' + genre.id);
	h3.innerText = genre.name;

	div.appendChild(h3);
	div.addEventListener('click', () => {
		location.hash = '#category=' + genre.id + '-' + genre.name;
	});
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

//LLamados a la API
async function getMoviesTrendingPreview() {
	trendingMoviesPreviewList.innerHTML = '';

	const res = await fetch(API_URL + '/trending/movie/day?api_key=' + API_KEI);
	const data = await res.json();
	const results = data.results;
	results.forEach((movie) => {
		generateMovie(trendingMoviesPreviewList, movie);
	});
}

async function getCategoriesPreview() {
	categoriesPreviewList.innerText = '';

	const { data } = await api_axios('/genre/movie/list');
	const genres = data.genres;

	genres.forEach((genre) => {
		generateCategories(categoriesPreviewList, genre);
	});
}

async function getMovieBySearch(nameMovie) {
	genericSection.innerHTML = '';

	const { data } = await api_axios('/search/movie', {
		params: {
			query: nameMovie,
		},
	});
	data.results.forEach((movie) => {
		generateMovie(genericSection, movie);
	});
}

async function getMoviesByCategory(category) {
	genericSection.innerHTML = '';
	const { data } = await api_axios('/discover/movie', {
		params: {
			genre: category,
		},
	});
	data.results.forEach((movie) => {
		generateMovie(genericSection, movie);
	});
}

async function getMovieById(movieId) {
	movieDetailCategoriesList.innerHTML = '';
	const { data } = await api_axios('/movie/' + movieId);

	movieDetailTitle.innerText = data.title;
	movieDetailDescription.innerText = data.overview;
	movieDetailScore.innerText = data.vote_average;
	movieDetailCategoriesList.innerHTML = '';
	data.genres.forEach((genre) => {
		generateCategories(movieDetailCategoriesList, genre);
	});

	const imgUrl = 'https://image.tmdb.org/t/p/w300' + data.poster_path;
	headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${imgUrl})
  `;
	headerSection.style.backgroundSize = 'cover';

	getMovieVideo(movieId);
}

async function getMovieVideo(movieId) {
	const { data } = await api_axios(`/movie/${movieId}/videos`);
	console.log(data.results);

	const trailer = `https://www.youtube.com/embed/${data.results[0].key}`;
	console.log(trailer);
	movieVideo.setAttribute('src', trailer);
}

async function getSimilarMovies(movieID) {
	relatedMoviesContainer.innerHTML = '';
	const { data } = await api_axios('/movie/' + movieID + '/similar');
	data.results.forEach((movie) => {
		generateMovie(relatedMoviesContainer, movie);
	});
}

async function getTrending() {
	genericSection.innerHTML = '';
	const { data } = await api_axios('/trending/movie/week');
	data.results.forEach((movie) => {
		generateMovie(genericSection, movie);
	});
}
