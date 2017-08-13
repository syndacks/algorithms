function palindrome(str) {
  str2 = str.replace(/\W+/g, "").replace(/_/, "").toLowerCase();
  console.log(str2);
  str3 = str2.split("").reverse().join("");
  console.log(str3);
  if (str3 === str2) {
    console.log("true");
    return true;
  } else {
    console.log("not true");
    return false;
  }
}



palindrome("A man, a plan, a canal. Panama");
