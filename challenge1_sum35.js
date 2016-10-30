//-------Challenge 1----------
// Return the sum of all the multiples of 3 and 5 below a given number
//----------------------------


var givenNumber = 10;

// make empty arrays for multiples of 3 and 5 to be pushed to 
var threesArray = [];
var fivesArray = [];

// find all the multiples of 3 below givenNumber and push to threesArray
for (var i = 1; i < givenNumber / 3; i++){
	threesArray.push(i*3);
}

// find all the multiples of 5 below givenNumber and push to fivesArray
for (var i = 1; i < givenNumber / 5; i++){
	fivesArray.push(i*5);
}

//sum the threesArray
var threesCounter = 0;
threesArray.forEach(function summer(term){
	threesCounter += term;
})

//sum the fivesArray
var fivesCounter = 0;
fivesArray.forEach(function summer(term){
	fivesCounter += term;
})

//add the threesCounter and fivesCounter together for final result
var finalResult = threesCounter + fivesCounter;

console.log(finalResult);