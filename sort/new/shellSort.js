function shellSort(arr){
	let len = arr.length, 
	gap = Math.ceil(len/2);
	for(; gap > 0; gap == 1? gap = 0 : gap = Math.ceil(gap/2)){
		// 控制gap从len/2一直减到0;
		for(let i = 0; i < gap; i++){
			// 控制每个gap中从0到gap也就意味着将arr分成了[0, ..., gap).length组
			for(let j = i + gap; j < len; j +=gap){
				// 分好组之后剩下的就是实现插入排序,每组元素的间隔为gap
				let cur = arr[j];
				let k = j - gap
				for(; k >= 0; k -= gap){
					if (arr[k] > cur ) {
						swap(arr, k, gap+k);
					}else{
						break;
					}
				}
				arr[k+gap] = cur;

			}

		}

	}
	return arr;
}


let ret = shellSort(arr);
console.log(ret);	