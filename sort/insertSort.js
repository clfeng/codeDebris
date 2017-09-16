// 插如排序
let arr = [5,48,1,56,76,12,45];

function insertSort(arr){
  let len=arr.length,preIndex,current;
  for(i=1;i<len;i++){
    preIndex = i-1;
    current = arr[i];
    while(preIndex>=0 && arr[preIndex]>current){
      arr[preIndex+1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex+1] = current;
  }
}

insertSort(arr);
console.log(arr);
