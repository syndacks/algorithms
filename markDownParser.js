// this is the string we want to parse
var stringToParse = "YOUR STRING HERE";

// this global object will keep track of the header title and level of header (h1, h2, h3 ... h6)
var globalObject = {
  // string that will go between <hx>mainString</hx>
  mainString: "",
  // number that will be on x, <hx>mainString</hx>
  headerCount: 0
}

// this parsing takes place in 2 phases, with each phase including multiple steps:
  // phase1: step 1, step 2, step 3
  // phase2: step 4, and step 5
  // final output: step 6

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

// phase 1 is the culmination of steps 1-3, above
// phase1 checks to make sure that the leading white space and hashtag symbols is used
// 
var phase1 = determineIfHashtag(cleanExtraSpace(determinePreSpacing(stringToParse)));


// step 4 - count the hashtags. If there are between 1 and 6 hashtags, the global object gets updated
function processLineForHashtags(line){
	var hashTagCount = 0;
	while(line.charAt(0) === "#"){
		line = line.slice(1);
		hashTagCount ++;
	}
	if(hashTagCount > 6){
		console.log("There are too many hashtags, please reduce to at most 6.")
		return;
	} else {
		//push hashTagCount to main object
		globalObject.headerCount = hashTagCount;
  }
}


// step 5 - split the hashtgs and header text, and determine if the hashtag section is correctly formatted
function splitHashtagsAndHeaderText(line){
  // using phase1 as a starting point, split the hashtags and header where there is a space (" ") into part1 and part2
  splitLineArray = phase1.split(" ");
  var arrayPart1 = splitLineArray[0]
  // isolate the last letter of part1, the header/hashtag section
  var lastLetter = arrayPart1.charAt(arrayPart1.length - 1)
  // then, determine if last letter of part1 is a hashtag. if not, return
  if(lastLetter !== "#"){
    console.log("This is not a valid HTML header, please only use hashtags");
    return;
    } else {
      var headerText = splitLineArray[1];
      // push mainString to main object
      globalObject.mainString = headerText;
      return line;
    }
}

// phase 2 culimnates in checking to make sure that the parameters are correct, and, if they are, updates the global object with the corrent text and number of #
var phase2 = splitHashtagsAndHeaderText(processLineForHashtags(phase1));

// step 6 the last step is to output HTML with the correct use of <hx>TEXT</hx>
function outputHTML(){
  var headerHTML = "<h" + globalObject.headerCount + ">" + globalObject.mainString + "</h" + globalObject.headerCount + ">";
  return headerHTML;
  }

console.log(outputHTML());

