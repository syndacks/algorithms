var markDownParser = (function () {

  // this global object will hold the  track of the header title and level of header (h1, h2, h3 ... h6)
  var globalObject = {
    stringToParse: "##### Awesome Header",
    // string that will go between <hx>mainString</hx>
    mainString: "",
    // number that will be on x, <hx>mainString</hx>
    headerCount: null
  }


  // parsing takes place in 2 phases, with each phase including multiple steps:
    // phase1: step 1, step 2, step 3
    // phase2: step 4 and step 5
    // final output: markup --> HTML


  // phase 1 checks that leading white space < 4 and that a hashtag symbols is used
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


  // phase 2 updates the global object with corrent text and number of # by counting #
  var phase2 = splitHashtagsAndHeaderText(
    countHashtags(
      phase1
      )
    );

    // step 4 - count the hashtags. If there are between 1 and 6 hashtags, the global object gets updated
    function countHashtags(line){
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
          var textArray = [];
          // this supports multiple word headers, such as "#### Aweseome Header"
          for(var i = 0; i<splitLineArray.length-1; i++){
            textArray.push(splitLineArray[i+1]);
          }
          var headerText = textArray.toString().replace(",", " ");
          // push mainString to main object
          globalObject.mainString = headerText;
          return line;
        }
    }


  // final output = HTML with the correct use of <hx>TEXT</hx> based on globalObject
  function outputHTML(){
    var headerHTML = "<h" + globalObject.headerCount + ">" + globalObject.mainString + "</h" + globalObject.headerCount + ">";
    return headerHTML;
    }

  console.log(outputHTML());

  return;
}());
