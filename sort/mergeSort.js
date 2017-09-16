// 归并排序


let arr = [5,48,1,56,76,12,45,20,12,16];
// let arr = [5,48,1,56,76,12];


function mergeSort(arr){
  let len = arr.length;
  if (arr.length<2) return arr;
  let middle = Math.floor(len/2),
  left = arr.slice(0,middle),
  right = arr.slice(middle);
  return merge(mergeSort(left),mergeSort(right));
}

function merge(left,right){
  let result = [];
  while(left.length && right.length){
    if (left[0]<right[0]) {
      result.push(left.shift());
    }else{
      result.push(right.shift());
    }
  }
  while(left.length){
    result.push(left.shift());
  }
  while(right.length){
    result.push(right.shift());
  }
  return result;
}

let result = mergeSort(arr);
console.log(result);