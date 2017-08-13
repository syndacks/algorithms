
function titleCase(str) {
  var arr = str.toLowerCase().split(" ")
  var arr2 = arr.map(function(word){
    return word.replace(word[0], word[0].toUpperCase());
  })
  var arr3 = arr2.join(" ");
  return arr3
}

titleCase("I'm a little tea pot");
