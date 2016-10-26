var str = "### hello"

// // split at the space
// var splitString = str.split(" ")
// console.log(splitString[0])

	


// if(str[0] === "#"){
// 	str = "<h1>hello</h1>";
// 	console.log("title");
// 	console.log(str);
// 	} else {
// 		console.log("not-title");
// 	};

// console.log(str.charAt(0));

function processLine(line){
	var hashTag = 0;
	while(line.charAt(0) === "#"){
		line = line.slice(1);
		hashTag ++;
		// console.log(line);
	};
	if(hashTag > 6){
		console.log("this is not a valid HTML header")
		return
	} else {
		var headerHTML = "<h" + hashTag + "></h" + hashTag + ">";	
		return headerHTML;
	}
};

processLine(str);
