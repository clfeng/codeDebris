// 冒泡排序

let arr = [5,48,1,56,76,12,45];

function bubbleSort(arr){
  let len = arr.length,temp;
  for(let i =0;i<len-1;i++){
    for(let j=0;j<len-1-i;j++){
      if (arr[j]>arr[j+1]) {
        temp = arr[j];
        arr[j]=arr[j+1];
        arr[j+1]= temp;
      }
    }
  }
  return arr;
}


bubbleSort(arr);


function bubbleSort_2(arr){
  let len = arr.length,temp;
  for(let i = len;i>0;i--){
    for(let j = 0;j<i-1;j++){
      if (arr[j]>arr[j+1]) {
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1]= temp;
      }
    }
  }
}

// bubbleSort_2(arr);


console.log(arr);
