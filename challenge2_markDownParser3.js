//-------Challenge 2----------
// Write a function that will parse markdown headers written in ATX style
// and return the appropriate HTML output
//------------

var markDownParser = (function () {

  // to use, modify stringToParse in globalObject and run markDownParser


  // globalObject will act as a packaging for the parser
  var globalObject = {
    stringToParse: "##### Hello There Good Sir",
    // string that will go between <hx>mainString</hx>
    mainString: "",
    // number that will be on x, <hx>mainString</hx>
    headerCount: null,
    // final output
    convertedToHTML: ""
  }


// parsing takes place in 2 phases, with each phase including multiple steps:
  // phase1: step 1, step 2, step 3
  // phase2: step 4, step 5, step 6

  // phase 1
  var phase1 = determineIfHashtag(
    cleanExtraSpace(
      determinePreSpacing(
        globalObject.stringToParse
        )
      )
    );

    // step 1 - determine if there are too many spaces before the #
    // based of docs, there can be between 1 and 4 spaces before the #
    function determinePreSpacing(line){
      var spacingCount = 0;
      while (line.charAt(0) === " "){
        // slicing will remove spaces before the hashtags
        line = line.slice(1);
        spacingCount ++;
      }
      if (spacingCount > 3){
        console.log("Too many spaces before the string, reduce to < 4 spaces.");
        throw "Error";
      } else {
          return line;
      }
    }

    // step 2 - clean out the extra spacing
    function cleanExtraSpace(line){
      line = line.trim();
      return line;
    }

    // step 3 - determine if the first character (after space) is a hashtag
    function determineIfHashtag(line){
      if(line.charAt(0) === "#"){
        return line;
      } else {
        console.log("This is not a valid header, use # as the leading symbol.")
        throw "Error";
      }
    }


  // phase 2
  var phase2 = outputHTML(
    splitHashtagsAndHeaderText(
      countHashtags(
        phase1
        )
      )
    );

    // step 4 - count the hashtags. If there are between 1 and 6 hashtags, 
    // the global object headerCount gets updated
    function countHashtags(line){
    	var hashTagCount = 0;
    	while(line.charAt(0) === "#"){
    		line = line.slice(1);
    		hashTagCount ++;
    	}
    	if(hashTagCount > 6){
    		console.log("There are too many hashtags, please reduce to at most 6.")
    		throw "Error";
    	} else {
    		//push hashTagCount to main object
    		globalObject.headerCount = hashTagCount;
      }
    }

    // step 5 - split the hashtgs and header text, and determine if the hashtag 
    // section is correctly formatted
    function splitHashtagsAndHeaderText(line){
      splitLineArray = phase1.split(" ");
      // check to see if hashtags at end of header text
      // such as "### Header ###", if so, handle
      potentialHashtag = splitLineArray[splitLineArray.length - 1]
        .toString().charAt(0);
      if(potentialHashtag==="#"){
        splitLineArray.pop();
      }
      // check to make sure the header text does not look like "###Hello"
      var arrayPart1 = splitLineArray[0]
      // isolate the last letter of part1, the header/hashtag section
      var lastLetter = arrayPart1.charAt(arrayPart1.length - 1)
      // then, determine if last letter of part1 is a hashtag. if not, return
      if(lastLetter !== "#"){
        console.log("This is not a valid HTML header, use only hashtags");
        throw "Error";
        } else {
          var textArray = [];
          // this supports multiple word headers, such as "#### Aweseome Header"
          for(var i = 0; i<splitLineArray.length-1; i++){
            textArray.push(splitLineArray[i+1]);
          }
          let pattern = /,/g;
          var headerText = textArray.toString().replace(pattern, " ");
          // push mainString to main object
          globalObject.mainString = headerText;
          return line;
        }
    }


    // step 6 - HTML with the correct use of <hx>TEXT</hx> based on globalObject
    function outputHTML(){
      if(globalObject.mainString !== ""){
        var headerHTML = "<h" + globalObject.headerCount + ">" + 
          globalObject.mainString + "</h" + globalObject.headerCount + ">";
        globalObject.convertedToHTML = headerHTML;
        return headerHTML;
      }
    }
 
  console.log(globalObject.convertedToHTML);
  return(globalObject);


}());
