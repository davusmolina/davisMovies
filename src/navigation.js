window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

searchFormBtn.addEventListener('click', () => {
	location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
	location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
	history.back();
	// location.hash = '#home';
});

function navigator() {
	if (location.hash.startsWith('#trends')) {
		console.log('estamos en trends');
		trendsPage();
	} else if (location.hash.startsWith('#search=')) {
		console.log('Estamos en search');
		searchPage();
	} else if (location.hash.startsWith('#category=')) {
		console.log('categories');
		categoriesPage();
	} else if (location.hash.startsWith('#movie=')) {
		console.log('movieDetails');
		movieDetailsPage();
	} else {
		homePage();
	}
}

function searchPage() {
	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.add('inactive');
	searchForm.classList.remove('inactive');
	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');
	movieVideo.classList.add('inactive');

	[_, query] = location.hash.split('=');
	getMovieBySearch(query);
}

function homePage() {
	console.log('Home!!');

	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.add('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.remove('inactive');
	headerCategoryTitle.classList.add('inactive');
	searchForm.classList.remove('inactive');

	trendingPreviewSection.classList.remove('inactive');
	categoriesPreviewSection.classList.remove('inactive');
	genericSection.classList.add('inactive');
	movieDetailSection.classList.add('inactive');
	movieVideo.classList.add('inactive');

	getMoviesTrendingPreview();
	getCategoriesPreview();
}

function categoriesPage() {
	console.log('categories!!');

	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.remove('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');

	const [_, categoryData] = location.hash.split('=');
	const [categoryId, categoryName] = categoryData.split('-');

	headerCategoryTitle.innerHTML = categoryName;
	getMoviesByCategory('accion');
}

function movieDetailsPage() {
	console.log('Movie!!');

	headerSection.classList.add('header-container--long');
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.add('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.add('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.add('inactive');
	movieDetailSection.classList.remove('inactive');
	movieVideo.classList.remove('inactive');

	const [_, movieId] = location.hash.split('=');
	getMovieById(movieId);
	getSimilarMovies(movieId);
	// getMovieVideo(movieId);
}

function trendsPage() {
	console.log('TRENDS!!');

	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.remove('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');
	movieVideo.classList.add('inactive');

	headerCategoryTitle.innerHTML = 'Tendencias';
	getTrending();
}
