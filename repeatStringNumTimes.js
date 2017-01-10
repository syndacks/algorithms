function repeatStringNumTimes(str, num) {
  var globalString = "";

  if(num<0){
    return "";
  } else {
  for(var i=0; i<num; i++){
    globalString += str;
    }
  }
  return(globalString);
}

repeatStringNumTimes("abc", 3);
