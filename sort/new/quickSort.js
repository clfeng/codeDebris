/*function quickSort (arr, left, right){
	left = typeof left == 'number'? left: 0;
	right = typeof right == 'number'? right: arr.length -1;
	if (left < right) {
		let partitionIndex = _partition(arr, left, right);
		quickSort(arr, left, partitionIndex - 1);
 		quickSort(arr, partitionIndex + 1, right);
	}
	return arr;
}
// 最终结果返回index, arr[left, ..., index-1] < arr[index]; arr[index + 1, ..., right] > arr[index]
function _partition(arr, left, right){
	let randomIndex = Math.floor(left + Math.random()*(right - left + 1));
	swap(arr, left, randomIndex);
	let pivot = arr[left],
		index = left; //[left+1, ... , index]
	// [left + 1, ..., index] < pivot ; (index+1, ..., right]>=pivot;
	for(let i = left + 1; i <= right; i++){
		if (arr[i] < pivot) {
			swap(arr, i, ++index);
		}
	}
	swap(arr, left, index);
	return index;
}
*/

/*
// 两路快排序
function quickSort(arr, left, right){
	left = typeof left == 'number'? left : 0,
	right = typeof right == 'number' ? right : arr.length - 1;
	if (left < right) {
		let partitionIndex = _partition2(arr, left, right);
		quickSort(arr, left, partitionIndex - 1);
 		quickSort(arr, partitionIndex + 1, right);
	}
	return arr;
}

function _partition2(arr, left, right){
	let randomIndex = Math.floor(left + Math.random()*(right - left + 1));
	swap(arr, left, randomIndex);
	// arr[left + 1, ..., lt) <= arr[left],
	// arr(gt, ..., right] >= arr[left];
	let pivot = arr[left],
		lt = left + 1, 
		gt = right;
	while(true){
		while(lt <= right && arr[lt] < pivot) lt++;
		while(gt >= left + 1 && arr[gt] > pivot) gt--;
		if (lt > gt) break;
		swap(arr, lt, gt);
		lt++;
		gt--;
	}
	swap(arr, left, gt);
	return gt;

}

*/

function quickSort(arr, left, right){
	left = typeof left === "number"? left : 0,
	right = typeof right === "number"? right : arr.length -1;
	if (left < right) {
		let randomIndex = Math.floor(left + Math.random()*(right - left + 1));
		swap(arr, left, randomIndex);
		// 遍历完之后的结果, arr[left + 1, ..., lt] >pivot, arr(lt, ..., i)==pivot, arr[gt, ..., right]
		let lt = left,
			gt = right + 1,
			i = left+1,
			pivot = arr[left];
		while(i < gt){
			if (arr[i] < pivot) {
				lt++;
				swap(arr, lt, i);
				i++;
			}else if(arr[i] > pivot){
				gt--;
				swap(arr, gt, i);
			}else{
				i++;
			}
		}
		swap(arr, left, lt);
		quickSort(arr, left, lt-1);
		quickSort(arr, gt, right);
	}
	return arr;
}


let ret = quickSort(arr);
console.log(ret);	