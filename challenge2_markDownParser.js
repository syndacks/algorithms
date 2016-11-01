function markdownParser(markdown){

	var globalObject = {};
	var splitLineArray = [];
	var finalTextArray = []
	var lineTrim, hashTagCount;

	lineTrim = markdown.trim();
	if (lineTrim.charAt(0) === "#") {
		splitLineArray = lineTrim.split(" ");	
	 } else {
	 	return markdown;
	 }

	hashTagCount = splitLineArray[0].length;
	if (hashTagCount < 7 && hashTagCount > 0){
		globalObject.hashTagCount = hashTagCount;
	} else {
		return markdown;
	}

	splitLineArray.shift();

	var	textArray = splitLineArray.filter(function(item){
		return(item !=="")
	});


	let pattern = /,/g;
	var headerText = textArray.toString().replace(pattern, " ");
	// push mainString to main object
	globalObject.mainString = headerText;

	return("<h" + globalObject.hashTagCount + ">" + globalObject.mainString + "</h" + globalObject.hashTagCount + ">")

}


markdownParser("#### Far Out Dude")