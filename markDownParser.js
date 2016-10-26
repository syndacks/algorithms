// this is the string we want to parse
var stringToParse = "#### hello"

// step 1 - determine if there are too many spaces before the #, based of docs, there can be between 1 and 4 spaces before the #
function determinePreSpacing(line){
  var spacingCount = 0;
  while (line.charAt(0) === " "){
    // slicing will remove spaces before the hashtags
    line = line.slice(1);
    spacingCount ++;
  }
  if (spacingCount > 3){
    console.log("There are too many spaces before the string, please reduce to at most 3 spaces.");
    return;
  } else {
      return line;
  }
}

// step 2 - clean out the extra spacing
function cleanExtraSpace(line){
  line = line.trim();
  return line;
}

// step 3 - determine if the first character (after space) is in fact a hashtag
function determineIfHashtag(line){
  if(line.charAt(0) === "#"){
    return line;
  } else {
    console.log("This is not a valid header, please use a # as a header symbol.")
  }
}

// step 4 - count the hashtags
function processLineForHashtags(line){
	var hashTagCount = 0;
	while(line.charAt(0) === "#"){
		line = line.slice(1);
		hashTagCount ++;
		// console.log(line);
	}
	if(hashTagCount > 6){
		console.log("There are too many hashtags, please reduce to at most 6.")
		return;
	} else {
      return hashTagCount;
      return line;
  }
}

// step 5 - split the hashtgs and header text, and determine if the hashtag section is correctly formatted
function splitHashtagsAndHeaderText(line){
  // split the hashtags and header where there is a space (" ") into part1 and part2
  splitLineArray = line.split(" ");
  var arrayPart1 = splitLineArray[0]
  // isolate the last letter of part1, the header/hashtag section
  var lastLetter = arrayPart1.charAt(arrayPart1.length - 1)
  // then, determine if last letter of part1 is a hashtag. if not, return
  if(lastLetter !== "#"){
    console.log("This is not a valide HTML header, please only use hashtags");
    return;
    } else {
      var headerText = splitLineArray[1];
      return headerText;
    }
}

function outputHTML(line){
  var headerHTML = "<h" + hashTagCount + ">" + headerText + "</h" + hashTagCount + ">";
  return headerHTML;
  }

// splitHashtagsAndHeaderText(stringToParse);

// console.log(outputHTML(splitHashtagsAndHeaderText(processLineForHashtags(determinePreSpacing(stringToParse)))));


function runAllFunctions (stringToParse){
  function determinePreSpacing(line){
    function cleanExtraSpace(line){
      function splitLine(line){
        function processLine(line){
        }
      }
    }
  }
}

// console.log(runAllFunctions(stringToParse));






// // step 3 - split the hashtags and text into two seperate strings
// function splitLine(line){
//   line.split(" ");
//   return line;
// }
