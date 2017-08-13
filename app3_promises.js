var request = require("request");
var cheerio = require("cheerio");
var http = require("http");
var fs = require("fs");
var ytdl = require("ytdl-core");

var videoSource = "http://av.voanews.com/Videoroot/Pangeavideo/2016/07/0/0c/0c3de39d-d832-4e44-a193-93171040cebf_hq.mp4"

var globalArray = [];


var vidShowPage = 'http://learningenglish.voanews.com/z/986/pc13.html';

// download(videoSource, 'videoTest45.mp4');

// var firstMethod = function() {
//    var promise = new Promise(function(resolve, reject){
//       setTimeout(function() {
//          console.log('first method completed');
//          resolve({data: '123'});
//       }, 2000);
//    });
//    return promise;
// };
 


var scrapeEpisodeUrls = function () {
    var promise = new Promise(function(resolve, reject){
	    request(vidShowPage, function(error, response, body) {
	        if (!error) {
	            var $ = cheerio.load(body);
	            // get all the showPage URLS
	            $('div.media-block.with-date.width-img.size-3 a.img-wrapper').filter(function() {
	                var titleText = $(this).attr('title');
	                var url = $(this).attr('href');
	                var fixedURL = "http://learningenglish.voanews.com" + url;
	                var myString = titleText + ":::" + fixedURL;
	                globalArray.push({
	                	key: fixedURL,
	                	videoURL: "",
	                	videoTitle: titleText,
	                	videoDescription: ""
	                });
	            })
	        }
	    })
	  resolve(globalArray);
  })
    return promise;
};



var getVideoUrlFromShowPage = function () {
  var promise = new Promise(function(resolve, reject){
    for (var i = 0; i < globalArray.length; i++) {
        request(globalArray[i].key, function(error2, response2, body2) {
            if (!error2) {
                var $$ = cheerio.load(body2);
                $$('div.player-and-links video').filter(function() {
                    var videoURL2 = $$(this).attr('src');
                    console.log("vidShowPage:::" + globalArray[i] + "VID_URL:: " + videoURL);
                    globalArray[i].videoURL = videoURL2;
                });
            }
        })
    }
  resolve(globalArray);
  })
  return promise;
}



// var download = function (url, dest, cb) {
//     var file = fs.createWriteStream(dest);
//     var request = http.get(url, function(response) {
//         response.pipe(file);
//         file.on('finish', function() {
//             file.close(cb); // close() is async, call cb after close completes.
//         });
//     }).on('error', function(err) { // Handle errors
//         fs.unlink(dest); // Delete the file async. (But we don't check the result)
//         if (cb) cb(err.message);
//     });
// }


 
var thirdMethod = function(someStuff) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log(globalArray);
         resolve({result: someStuff.newData});
      }, 3000);
   });
   return promise;
};
 
scrapeEpisodeUrls()
   .then(getVideoUrlFromShowPage)
   .then(thirdMethod)