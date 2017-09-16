/*function countingSort(arr, maxValue) {
    var bucket = new Array(maxValue+1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;

    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }

    return arr;
}*/

function countingSort(arr,maxValue){
    let buket = new Array(maxValue+1),
        sortedIndex = 0,
        arrLen = arr.length,
        buketLen = maxValue +1;
    for(let i = 0;i<arrLen;i++){
        if (!buket[arr[i]]) {
            buket[arr[i]] = 0;
        }
        buket[arr[i]]++;
    }
    for(let j = 0;j< buketLen;j++){
        while(buket[j]>0){
            arr[sortedIndex++] = j;
            buket[j]--;
        }
    }
}

let arr = [5,48,1,56,76,12,45,20,12,16];
countingSort(arr,76);
console.log(arr);