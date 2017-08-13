// require underscore library
var _ = require('underscore')

// require each app's db.json file, if can't be found, throw error
try{
	var data = require('./content/db.json');
} catch (err) {
	getCurrentDirectoryName();
	return;
}

// determines number of articles that belong to each tag using _.countBy method
var categoryData = _.countBy(data.content, function(data) { return data.tags; });

//count categories
var count = 0;
for (k in categoryData) if (categoryData.hasOwnProperty(k)) count++;

//print it all out
console.log("---")
	//app title
	console.log("AppId: " + _.values(data)[0])
	//category info
	console.log("Number of Categories: " + count);
	console.log("Category/Article data: ");
	console.log(categoryData)


// bash script to copy app.js to all subdirectories
// for d in */; do cp app.js "$d"; done

// bash script to run in parent directory
// for d in com.endlessm.*?/; do (cd $d && node ./app.js); done

// function to print working directory if catch error above
function getCurrentDirectoryName(){
	var fullPath = __dirname; 
	var path = fullPath.split('/'); 
	var cwd = path[path.length-1]; 
	console.log(cwd);
}