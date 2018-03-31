

const URL = "https://www.googleapis.com/youtube/v3/search";
const API_KEY = 'AIzaSyChqMkEAPPuAP7TB4P09y6eMHcuY0-qlkw';

// make ajax request to recieve data
function getYouTubeData(searchTerm, callback) {
	const params = {
		part: 'snippet',
		key: API_KEY,
		q: `${searchTerm} in:name`,
		per_page: 5
	}
	$.getJSON(URL, params, callback);
}

//render results
function resultsRender(result) {
	return `
		<ul class="video-list clearfix">
				<li class="video">
				<div class="col-1">
					<a class="thumbnail" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
						<img src="${result.snippet.thumbnails.medium.url}">
					</a>
					</div>
					<div class="col-2">
					<h2 class="title">${result.snippet.title}</h2>
					<p class="description">${result.snippet.description}</p>
					</div>
				</li>
			
		</ul>
	`
}

// display rendered results to page
function displaySearchData(data) {
  const results = data.items.map((item, index) => { 
    console.log(item);
    resultsRender(item);
  });
  $('.results').html(results);
}

//user enters search parameters and submits
function searchHandler() {
	$('#js-search').submit( event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();
		queryTarget.val("");
		getYouTubeData(query, displaySearchData);
	});
	
}

$(searchHandler);