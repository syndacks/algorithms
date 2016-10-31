//-------Challenge 1----------
// Return the sum of all the multiples of 3 and 5 below a given number
//----------------------------

var challenge1 = (function () {

	var public = {};

	public.calculate = function(givenNumber){

		// make empty arrays for multiples of 3 and 5 to be pushed to 
		var matchedArray = [];

		for (var i = 1; i < givenNumber; i++){
			if(i%3 === 0 || i%5 === 0){
				matchedArray.push(i);
			}
		}

		//sum the matchedArray
		var counter = 0;
		matchedArray.forEach(function summer(term){
			counter += term;
		})

		console.log(counter);
	}

return public;

}());

// challenge1.calculate(100)