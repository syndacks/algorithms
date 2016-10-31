//-------Challenge 1----------
// Return the sum of all the multiples of 3 and 5 below a given number
//----------------------------

function solution(number){
  
  var matchedArray = [];

  for (var i = 1; i < number; i++){
      if(i%3 === 0 || i%5 === 0){
          matchedArray.push(i);
      }
  }

  //sum the matchedArray
  var counter = 0;
  matchedArray.forEach(function summer(term){
      counter += term;
  })

  return counter;
  
}