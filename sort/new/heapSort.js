function heapSort(arr){
	let len = arr.length;
	for(let i = Math.floor(len/2) - 1; i >= 0; i--){
		_heapify(arr, i, len);
	}
	for(let j = len - 1; j > 0; j--){
		swap(arr, j, 0);
		_heapify(arr, 0, j);
	}
	return arr;
}
	
	function _heapify(arr, i, len){
		let largest = i;
			left = 2*i + 1,
			right = 2*i + 2;
		if (left < len && arr[left] > arr[largest]) {
			largest = left;
		}
		if (right < len && arr[right] > arr[largest]) {
			largest = right;
		}
		if (largest != i) {
			swap(arr, i, largest);
			_heapify(arr, largest, len);
		}
	}

let ret = heapSort(arr);
console.log(ret);
