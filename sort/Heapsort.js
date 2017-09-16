var len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
let arr = [5,48,1,56,76,12,45,20,12,16];

function heapSort(arr){
    buildMaxHeap(arr);
    for(let i = len-1;i>0;i--){
        swap(arr,0,i);
        len--;
        heapify(arr,0);
    }
}
function buildMaxHeap(arr){
    len = arr.length;
    for(let i = Math.floor(len/2);i>=0;i--){
        heapify(arr,i);
    }
}
function heapify(arr,i){
    let left = i*2+1,
        right = i*2+2,
        largest = i;
    if (left<len && arr[largest]<arr[left]) {
        largest =left;
    }
    if (right<len && arr[largest]<arr[right]) {
        largest = right;
    }
    if (largest != i) {
        swap(arr,largest,i);
        heapify(arr,largest);
    }
}
function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
heapSort(arr);

console.log(arr)