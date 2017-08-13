function confirmEnding(str, target) {
  if(str.includes(" ")){
    var firstWord = str.split(" ").reverse()[0]
    if (firstWord.includes(target)) {
      console.log("true");
      return true;
    } else {
      return false;
    }
  } else {
  var str2 = str.split("").reverse()
  var firstLetter = str2[0]
  if(firstLetter === target){
    console.log("true");
    return true;
  } else {
    return false;
  }
  }
}
confirmEnding("Dacks", "s");
