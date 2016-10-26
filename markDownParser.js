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

var str = " ## hello"

function first(magicNumber){
  return magicNumber * 2;
}

function second(magicNumber){
  return magicNumber + 1;
}

console.log(second(first(3)));


// 1 - first determine if there are too many spaces before the #

function determinePreSpacing(line){
  var spacingCount = 0;
  while (line.charAt(0) === " "){
    line = line.slice(1);
    spacingCount ++;
  }
  if (spacingCount > 4){
    console.log("there are too many spaces before the hashtags, please reduce to no more than 4 spaces");
    return;
  } else {
    return line;
  }
}

console.log(determinePreSpacing(str));

// 2 - clean out the extra spacing with str.trim()

function cleanExtraSpace(line){
  line.trim();
  return line;
}

console.log(cleanExtraSpace(determinePreSpacing(str)));

// 3 - split the hashtags and text into two seperate strings

function splitLine(line){
  line.split(" ");
}


// 4 - count the hashtags
function processLine(line){
	var hashTagCount = 0;
	while(line.charAt(0) === "#"){
		line = line.slice(1);
		hashTagCount ++;
		// console.log(line);
	}
	if(hashTagCount > 6){
		console.log("this is not a valid HTML header")
		return
	} else {
		var headerHTML = "<h" + hashTagCount + "></h" + hashTagCount + ">";
		return headerHTML;
	}
}

