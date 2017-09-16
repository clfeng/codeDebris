function selectionSort(arr){
	for(var i = 0, len = arr.length; i < len-1; i++){
		for(var j = i; j < len; j++){
			var min = i;
			if(arr[j] < arr[min]){
				swap(arr, j, min);
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
let ret = selectionSort(arr);
console.log(ret);