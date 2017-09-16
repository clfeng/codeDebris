function mergeSort(arr){
	let len = arr.length,
		middle = Math.floor(len/2);
	if(len < 2) return arr;
	let left = arr.slice(0, middle);
	let right = arr.slice(middle, len);
	return _merge(mergeSort(left), mergeSort(right));
}

function _merge(left, right){
	let ret = [];
	while(left.length && right.length){
		if (left[0] < right[0]) {
			ret.push(left.shift());
		}else{
			ret.push(right.shift());
		}
	}
	while(left.length){
		ret.push(left.shift());
	}
	while(right.length){
		ret.push(right.shift());
	}
	return ret;
}



let ret = mergeSort(arr);
console.log(ret);	