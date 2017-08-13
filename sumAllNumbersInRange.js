function sumAll(arr) {
  // find min
  let arr_min = Math.min(arr[0], arr[1]);

  // find max
  let arr_max = Math.max(arr[0], arr[1]);

  // integerize the min and max range
  let array_to_sum = [];
  for(var i = arr_min; i <= arr_max; i++){
    array_to_sum.push(i);
  }

  // sum up the integerized array
  const summed_array = array_to_sum.reduce((a, b) => {
    return a + b;
  });

  console.log("summed_array: ", summed_array);
  return summed_array;
}

sumAll([1, 4]);
sumAll([4, 1]);
