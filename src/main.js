const API_URL = 'https://api.themoviedb.org/3';
async function getMoviesTrendingPreview() {
	const res = await fetch(API_URL + '/trending/movie/day?api_key=' + API_KEI);
	const data = await res.json();
	const results = data.results;

	let sectionTrending = document.getElementById('trendingPreview-movieList');
	sectionTrending.innerText = '';

	results.forEach((movie) => {
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

		sectionTrending.appendChild(div);
	});
}
getMoviesTrendingPreview();

async function getCategoriesPreview() {
	const res = await fetch(API_URL + '/genre/movie/list?api_key=' + API_KEI);
	const data = await res.json();
	const genres = data.genres;
	console.log(genres);

	let sectionCategories = document.getElementsByClassName(
		'categoriesPreview-list'
	);
	sectionCategories[0].innerText = '';

	genres.forEach((genre) => {
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

		sectionCategories[0].appendChild(div);
	});
}
getCategoriesPreview();
