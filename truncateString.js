
function truncateString(str, num) {
if (str.length > num + 3) {
  var str2 = str.slice(0, num-3);
  str2 += "...";
  return(str2);
} else {
  var str3 = str.slice(0, num);
  str3 += "...";
  return(str3);
}
}

truncateString("A-", 1)
