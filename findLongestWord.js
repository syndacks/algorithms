function findLongestWord(str) {
  var arr = str.split(" ");
  var numbers = arr.map(function(term){
    return term.length
  })

  numbers.sort(function(a,b){
    return b-a;
  })

  return numbers[0]
}

findLongestWord("The quick brown fox jumped over the lazy dog");
