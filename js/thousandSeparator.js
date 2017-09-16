function sep(num){
	// 安全性检测确定传入的数字能被转为数字;
	if (isNaN(num)) { throw new Error("您传入的数据不合法")};
	//将数字转为字符串并去掉前后的空白符(如果一开始传入的就是字符串的话可能会存在空白符)
	num = num && num.toString().trim();
	let reg = /(\d)(?=(\d{3})+(\.\d+)$)/g;
	return num.replace(reg, function ($0){
		return $0+",";
	})
}

function sep2(num){
	// 安全性检测确定传入的数字能被转为数字;
	if (isNaN(num)) { throw new Error("您传入的数据不合法")};
	//将数字转为字符串并去掉前后的空白符(如果一开始传入的就是字符串的话可能会存在空白符)
	num = num && num.toString().trim();
	let temp = num.split(".");
	let intPart = temp[0], retStr = "";
	for(let i = intPart.length -1, j = 1; i >= 0; i--, j++){
		if(j % 3 == 0 && i != 0){
			retStr += intPart[i] + ",";
			continue;
		}
		retStr += intPart[i];
	}
	if (temp.length == 2) {
		let  int = retStr.split("").reverse().join("");
		return int + "."+ temp[1];
	}else{
		return	retStr.split("").reverse().join("");
	}

}



let ret = sep2(" 1023456789.1223");
console.log(ret);
