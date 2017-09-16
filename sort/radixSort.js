//LSD Radix Sort
var counter = [];
/*function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]==null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for(var j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    return arr;
}*/
function radixSort(arr,maxDigit){
    let mod = 10,
        dev = 1;
    for(let i = 0;i<maxDigit;i++,mod *=10,dev*=10){
        for(let j =0; j<arr.length;j++){
            let bucket = parseInt((arr[j]%mod)/dev);
            if(counter[bucket] == null){
                counter[bucket]=[];
            }
            counter[bucket].push(arr[j]);
        }
        let pos = 0;
        for(let j=0;j<counter.length;j++){
            let value = null;
            if (counter[j]!=null) {
                while((value=counter[j].shift())!=null){
                    arr[pos++] = value;
                }
            }
        }
    }
    return arr;
}
let arr = [5,48,1,56,76,12,45,20,12,16];
radixSort(arr,2);
console.log(arr);