// 希尔排序
// 该排序是简单插入排序的改良，基于简单插入排序的一下特点
// 简单插入排序对几乎已经有序的的数组进行排序的效率很高，
// 另外就是简单插入排序的由于每次只移动一位效率还是很低

// 希尔排序则通过将数组分成子数组，然后在对子数组进行排序，
// 最后将排序的将已经排好序的数组进行一次全排序


/*function shellSort(arr){
    let len = arr.length,gap=Math.ceil(len/2),temp;
    for(;gap>0;gap!=1?gap=Math.ceil(gap/2):gap=0){
        for(let i=gap-1;i>=0;i--){
            for(let j=i;j+gap<len; j+=gap){
                if(arr[j]>arr[j+gap]){
                    temp = arr[j];
                    arr[j] = arr[j+gap];
                    arr[j+gap] = temp;
                }
            }
        }
    }
    return arr;
}*/
function shellSort(arr){
    let len = arr.length,gap=Math.ceil(len/2),current;
    for(;gap>0;gap!=1?gap=Math.ceil(gap/2):gap=0){
        for(let i=gap-1;i>=0;i--){
            for(let j=i+gap;j<len; j+=gap){
                let preIndex = j-gap;
                current = arr[j];
                while(j>=0 && arr[preIndex]>current){
                    arr[preIndex+gap] = arr[preIndex];
                    preIndex-=gap;
                }
                arr[preIndex+gap] = current;
            }
        }
    }
    return arr;
}


let arr = [5,48,1,56,76,12,45,20,12,16];



shellSort(arr);
console.log(arr);



function shellSort(arr){
    let len = arr.length, gap = Math.ceil(len/2), current;
    for(; gap>0; gap !=1? gap = Math.ceil(gap/2): gap = 0){
        for(let i = gap-1; i>=0; i--){
            for(let j=i+gap; j<len; j+=gap){
                let preIndex = j-gap;
                current = arr[j];
                while(j>=0 && arr[preIndex]>current){
                    arr[preIndex+gap] = arr[preIndex];
                    preIndex-=gap;
                }
                arr[preIndex+gap] = current;
            }
        }
    }
}

























