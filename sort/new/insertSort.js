function insertSort(arr){
	for(var i = 1, len = arr.length; i < len; i++){
		var cur = arr[i],
			j = i-1;
		while( j >= 0){
			if(arr[j] > cur){
				arr[j+1] = arr[j];
				j--;
			}else{
				break;
			}
		}
		arr[j+1] = cur;
	}
	return arr;
}


let ret = insertSort(arr);
console.log(ret);
