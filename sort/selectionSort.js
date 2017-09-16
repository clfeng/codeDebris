// 选择排序
let arr = [5,48,1,56,76,12,45];

function selectionSort(arr){
  let len=arr.length,temp,minIndex;
  for(let i=0;i<len;i++){
    minIndex=i;
    for(let j = i;j<len;j++){
      if (arr[j]<arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i]=arr[minIndex];
    arr[minIndex] = temp;
  }
}

selectionSort(arr);
console.log(arr);