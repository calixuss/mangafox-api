var cheerio = require('cheerio');
var request = require('request');

var allMangaURL = "http://mangafox.me/manga/";

function retrieveMangaList(callback, errorCallback){
	request(allMangaURL, function(err, response, body){
		if(err){
			if(errorCallback){
				errorCallback(err);
			} else {
				throw err;
			}
			return;
		}
		var $ = cheerio.load(body);
		var links = $('.series_preview');
		var list = [];
		for (var i = 0; i < links.length; i++) {
			var aElement = $(links[i]);
			var name = aElement.text();
			var link = aElement.attr('href');
			var series_id = aElement.attr('rel');
			list.push({
				name: name,
				link: link,
				series_id: series_id
			});
		};
		callback(list);
	});
}

var seriesDetailURL = "http://mangafox.me/ajax/series.php";

function populateMangaInfo(manga_object, callback, errorCallback){
	request.post(seriesDetailURL, {
		form: {
			sid: manga_object.series_id
		}
	}, function(err, response, body){
		if(err){
			if(errorCallback){
				errorCallback(err);
			} else {
				throw err;
			}
			return;
		}
		console.log(JSON.parse(body));
	});
}


module.exports = {
	retrieveMangaList: retrieveMangaList,
	populateMangaInfo: populateMangaInfo,
};