function bubbleSort(arr){
	for(var i = 0, len = arr.length; i < len-1; i++){
		for(var j = 0; j < len -1 - i; j++){
			if (arr[j] > arr[j+1]) {
				swap(arr, j, j+1);
			}
		}
	}
	return arr;
}
function swap (arr, i, j){
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

let arr = [5,48,1,56,76,12,45];
let ret = bubbleSort(arr);
console.log(ret);
