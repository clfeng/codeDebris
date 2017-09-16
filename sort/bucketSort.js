/*function bucketSort(arr, bucketSize) {
    if (arr.length === 0) {
        return arr;
    }

    var i;
    var minValue = arr[0];
    var maxValue = arr[0];
    for (i = 1; i < arr.length; i++) {
        if (arr[i] < minValue) {
            minValue = arr[i]; // 输入数据的最小值
        } else if (arr[i] > maxValue) {
            maxValue = arr[i]; // 输入数据的最大值
        }
    }

    //桶的初始化
    var DEFAULT_BUCKET_SIZE = 5, // 设置桶的默认数量为5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
    }

    arr.length = 0;
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]); // 对每个桶进行排序，这里使用了插入排序
        for (var j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);
        }
    }

    return arr;
}
*/

function bucketSort(arr,bucketSize){
    if (arr.length == 0) return;
    let len = arr.length,
        minValue = arr[0],
        maxValue = arr[0];
    for(let i = 0; i<len; i++){
        if (minValue>arr[i]) {
            minValue = arr[i];
        }else if(maxValue<arr[i]){
            maxValue = arr[i];
        }
    }
    let DEFAULT_BUCKET_SIZE = 5;
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    let bucketCount = Math.floor((maxValue-minValue)/bucketSize) +1;
    var buckets = new Array(bucketCount);
    for(let i = 0,bucketsLen=buckets.length;i<bucketsLen;i++){
        buckets[i] = [];
    }
    for(let i = 0;i<len;i++){
        buckets[Math.floor((arr[i]-minValue)/bucketSize)].push(arr[i]);
    }
    arr.length = 0;
    for(let i=0;i<buckets.length;i++){
        insertSort(buckets[i]);
        for(var j = 0;j<buckets[i].length;j++){
            arr.push(buckets[i][j]);
        }
    }
    return arr;

}

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
let arr = [5,48,1,56,76,12,45,20,12,16];
bucketSort(arr);
console.log(arr);