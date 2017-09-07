// 注意点：
// DOM0事件处理函数会在元素对象作用域中运行
// DOM2,addEventListener,会在元素对象作用域中运行
// IE,attachEvent会在全局作用域中运行，也就是说this并不指向元素对象



// 跨浏览器添加事件
EventUtil={
  addHandler:function (elem,type,fn){
    if (elem.addEventListener) {
      elem.addEventListener(type,fn,false);
    }else if(elem.attachEvent){
      elem.attachEvent('on'+type,fn);
    }else{
      elem['on'+type] = fn;
    }
  },
  removeHandler:function (elem,type,fn){
    if (elem.removeListener) {
      elem.removeListener(type,fn,false)
    }else if(elem.detachEvent){
      elem.detachEVent('on'+type,fn);
    }else{
      elem['on'+type] = null;
    }
  },
  getEvent(event){
    return event? event: window.event;
  },
  getTarget(event){
    return event.target || event.srcElement;
  }
  preventDefault(event){
    if (event.preventDefault) {
      event.preventDefault()
    }else{
      event.returnValue = false;
    }
  },
  stopPropagation(event){
    if (event.stopPropagation) {
     event.stopPropagation();
   }else{
    event.cancelBubble = true;
  }
}

// 位置，视口信息
// event.clientX,event.clientY获取元素新相对于视口的信息

// pageX和pageY则获取的是元素相对于页面上的信息
// IE8-不支持pageX和pageY，可通过计算获得
EventUtil.addHandler(div,'click',function(event){
  event = EventUtil.getEvent(event);
  var pageX = event.pageX,
  pageY = event.pageY;
  if(pageX === undefined){
    pageX = event.clientX + (document.body.scrollLeft|| document.documentElement.scrollLeft);
    pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
  }
});


// IE8以前，不支持
var EventUtil ={
  getRelatedTarget: function (event){
    if (event.relatedTarget) {
     return event.relatedTarget;
   }else if(event.toElement){
     return event.toElement;
   }else if(event.fromElement){
     return event.fromElement
   } else{
     return null;
   }
 }

// 滚轮事件
getWheelDelta:function (event){
  if (event.wheelDelta) {
    // return (client.engine.opera && client.engine.opera<9.5)? -event.wheelDelta : event.wheelDelta;
    return event.wheelDelta;
  }else{
    return -event.detail*40
  }
}
EventUtil.addEvent(document,"mousewheel",handleMouseWheel)

// FireFox
EventUtil.addEvent(document,"DOMMouseScroll",handleMouseWheel)

// 在DOM构建后出发

//ie9+ 
EventUtil.addHandler(document,'DOMContentLoaded',function (){
  console.log('hi');
})

//IE
EventUtil.addHandler(document,'readystatechange',function (){
  if (document.readyState == 'interactive' || document.readyState == 'complete') {
    console.log('hi');
  }
})


// Function.prototype.bind()
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis){
    if(typeof oThis != 'function') throw new Error("wrong");
    var fToBound = this;
    var aArgs = Array.prototype.slice.call(arguments, 1);
    var fNOP = function (){};
    var fBound = function(){
      fToBound.apply(this instanceof fNOP? this: oThis, aArgs.cancat(Array.prototype.slice.call(arguments)));
    }

    if (this.prototype) {
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fBound();

    return fBound;
  }
}


// 将url拆成字典对象
function getQueryObj(url){
  url = url == null? window.location.href : url;
  var search = url.substring(url.lastIndexof("?")+1);
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function (match, $1, $2){
    var key = encodeURIComponent($1);
    var value = encodeURIComponent($2);
    value = String(value);
    obj[key] = value;
    return match;
  })
  return obj;
}

// 实现链式调用

function A(selector){
  return new A.fn.init(selector);
}
A.fn = A.prototype = {constructor: A};
A.prototype.init = function (selector){
  this.elements = [];
}
A.prototype.init.prototype = A.prototype;


// 动态添加script代码
function loadScriptString(code){
  var script = document.createElement("script");
  script.type = "text/javascript";
  try{
    script.appendChild(document.createTextNode(code));
  }catch(e){
      //IE
      script.text = code
    }
    document.appendChild(script);
  }
// 动态添加css代码
function loadStylesString(css){
  var style = document.createElement('style');
  style.type = 'text/css';
  try{
    //在IE中会报错,IE将<style>视为一个特殊的,与<script>类似的节点,不允许访问其子节点
    style.appendChild(document.createTextNode(css))
  }catch(e){
   //IE 
   style.styleSheet.cssText(css);
 }
 var head= document.getElementsByTagName('head')[0];
 head.appendChild(style);
}

// 获取和设置元素中的文本
function getInnerText(element){
  return (typeof element.textContent == "string")? element.textContent: element.innerText;
}
function setInnerText(element, text){
  if (typeof element.textConentent == 'string') {
    element.textContent = text;
  }else{
    element.innerText = text;
  }
}