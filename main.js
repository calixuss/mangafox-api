var mangafox = require('./src/mangafox.js');
var serialize = require('./src/serialize.js');

// mangafox.retrieveMangaList(function(list){
// 	console.log("Found %s manga", list.length);
// 	serialize.writeObjectToFile(list, "manga.json", function(){console.log("done")});
// }, function(err){
// 	console.log(err);
// });

function populateList(){
	var manga_list = null;
	serialize.readObjectFromFile("manga.json", function(list){
		manga_list = list;
		startPopulating();
	});

	var avaiableThreads;
	var currentIndex;
	function startPopulating(){
		avaiableThreads = 10;
		currentIndex = 0;
		populatingLoop();
	}
	function populatingLoop(){
		if(avaiableThreads < 1){
			return;
		}
		if(currentIndex >= manga_list.length){
			return;
		}
		avaiableThreads--;
		
		var manga = manga_list[currentIndex++];
		mangafox.populateMangaInfo(manga, function(manga){
			loopComplete();
		});
	}
	function loopComplete(){
		avaiableThreads++;
	}
}

populateList();