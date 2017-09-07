function A(str){
	new A.fn.init(str);
}

A.fn = A.prototype = {
	constructor: A,
	init: function (str){
		// 存储最后的元素
		this.elements = [];
		if(typeof str == "string"){
			// 字符串选择器
			if (document.querySelector) {
				var nodes = document.querySelectorAll(str);
				for(var i = 0, len = nodes.length; i < len; i++){
					this.elements.push(nodes[i]);
				}
				return;
			}
			var selectors = str.split(" ");
			var childElements = [];
			var parentNodes = [];
			for(var i = 0, len = selectors.length; i < len; i++){
				var curSelector = selectors[i];
				switch(curSelector.charAt(0)){
					case "#":
						childElements = [];
						childElements.push(document.getElementById(curSelector.slice(1)));
						parentNodes = childElements;
					break;
					case ".":
						childElements = [];
						for(var j = 0, jLen = parentNodes.length; j < jLen; j++){
							// childElements.cancat(node[jLen].querySelector(curSelector.slice(1)));
							childElements.cancat(this.getClass(curSelector.slice(1), node[jLen]));
						}
						parentNodes = childElements;
					break;
					default:
						childElements = [];
						for(var j = 0, jLen = parentNodes.length; j < jLen; j++){
							childElements.cancat(node[jLen].getElementsByTagName(curSelector.slice(1)));
						}
						parentNodes = childElements;
					break;
				}
			}	
			this.elements = childElements;	
		}else if(typeof str == "object"){
			// 传入的是对象
			this.elements.push(str);
		}else if(typeof str == "function"){
			this.addEvent(document, "DOMContentLoaded",str);
		}
	},
	getClass: function (selector, parentNode){
		parentNode = parentNode != undefined? parentNode : document;
		var all = parentNode.getElementsByTagName("*"),
			temps = [];
		for(var i = 0, len = all.length; i < len; i++){
			var reg = new ReqExp("(\\s|^)*"+selector.slice(1)+"(\\s|$)*");
			if(reg.test(all[i].className)){
				temps.push(all[i]);
			}
		}
		return temps;
	},
	addEvent: function (elem, type, fn){
		if (elem.addEventListener) {
			elem.addEventListener(type, fn, false);
		}else if(elem.attachEvent){
			elem.attachEvent('on'+type, fn);
		}else{
			elem['on'+type] = fn;
		}
	}
}
// 使得A.fn.init()创建的实例能继续要原型中的方法
A.fn.init.prototype = A.fn;