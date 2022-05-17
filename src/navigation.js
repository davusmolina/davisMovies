window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
	if (location.hash.startsWith('#trends')) {
		console.log('estamos en trends');
	} else if (location.hash.startsWith('#search=')) {
		console.log('estamos en search');
	} else if (location.hash.startsWith('#category=')) {
		console.log('categories');
	} else {
		getMoviesTrendingPreview();
		getCategoriesPreview();
	}
}
