var request = require("request");
var cheerio = require("cheerio");
var http = require("http");
var fs = require("fs");

var videoSource = "http://av.voanews.com/Videoroot/Pangeavideo/2016/07/0/0c/0c3de39d-d832-4e44-a193-93171040cebf_hq.mp4"

var globalArray = [
"http://learningenglish.voanews.com/a/3435564.html",
"http://learningenglish.voanews.com/a/3605385.html",
"http://learningenglish.voanews.com/a/3620609.html",
"http://learningenglish.voanews.com/a/3563804.html",
"http://learningenglish.voanews.com/a/3240171.html",
"http://learningenglish.voanews.com/a/3605387.html",
"http://learningenglish.voanews.com/a/3545534.html",
"http://learningenglish.voanews.com/a/3406302.html",
"http://learningenglish.voanews.com/a/3563798.html"
];

var vidsToDownload = [
'http://av.voanews.com/Videoroot/Pangeavideo/2016/11/d/dc/dc28b28a-8a3d-42b4-bbaf-7a3710ccff11_hq.mp4',
'http://av.voanews.com/Videoroot/Pangeavideo/2016/10/a/a3/a3059e29-a602-492d-918d-f9ac7122a33a_hq.mp4',
'http://av.voanews.com/Videoroot/Pangeavideo/2016/11/c/c2/c2ead044-e9cc-4834-ba20-2164ef45f4d3_hq.mp4',
'http://av.voanews.com/Videoroot/Pangeavideo/2016/10/6/69/691bff73-3e7d-4535-a1c4-225bfa7543d4_hq.mp4',
'http://av.voanews.com/Videoroot/Pangeavideo/2016/07/0/0c/0c3de39d-d832-4e44-a193-93171040cebf_hq.mp4',
'http://av.voanews.com/Videoroot/Pangeavideo/2016/07/d/d8/d84d89f5-c535-4bec-be63-a6514b462f10_hq.mp4',
'http://av.voanews.com/Videoroot/Pangeavideo/2016/12/6/64/6418b8b2-f6e1-423e-8579-fe5d3a408ec1_hq.mp4',
'http://av.voanews.com/Videoroot/Pangeavideo/2016/10/f/f3/f38dfd96-7be5-42df-8739-6449311e6c28_hq.mp4',
'http://av.voanews.com/Videoroot/Pangeavideo/2016/03/e/ee/eef9adba-fac6-4436-87a0-fc22c282915e_hq.mp4'
];

var vidShowPage = 'http://learningenglish.voanews.com/z/986/pc13.html';

// download(videoSource, 'videoTest45.mp4');


function scrapeEpisodeUrls () {
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
                	videoTitle: "",
                	videoDescription: ""
                });
            })
        }
    })
}

// scrapeEpisodeUrls();


function getVideoUrlFromShowPage() {
    for (var i = 0; i < globalArray.length; i++) {
        request(globalArray[i], function(error2, response2, body2) {
            if (!error2) {
                var $$ = cheerio.load(body2);
                $$('div.player-and-links video').filter(function() {
                    var videoURL = $$(this).attr('src');
                    var videoURL_HQ = videoURL.slice(0, -4) + "_hq" + videoURL.slice(-4);
                    console.log("'"+videoURL_HQ+"'"+",");
                });
            }
        })
    }
}

// getVideoUrlFromShowPage();


function download (url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb); // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
}


for (i=1;i<vidsToDownload.length; i++){
    filename= "./videos/file"+i+".mp4";
    download(vidsToDownload[i], filename);
    }



