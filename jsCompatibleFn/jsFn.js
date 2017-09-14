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
// 获取计算后的样式
function getComputedStyle(elem, attr){
  if (window.getComputedStyle) {
    return window.getComputedStyle(elem, null)[attr];
  }else{
    return document.style.currentStyle;
  }
}
// 通过<link><style>元素取得CSSStyleSheet对象
function getStyleSheet(elem){
 return elem.sheet || elem.styleSheet;
}

// 获取元素在这个页面中偏移量的方法
function getElementLeft(element){
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while(current != null){
    actualLeft +=current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}
function getElementTop(element){
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while(current != null){
    actualTop +=current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}

// 获取页面视口大小    
function getViewport(){
 if (document.compatMode == 'BackCompat') {
  return {
    width: document.body.clientWidth,
    height: document.body.clientHeight
  }
}else{
  return {
    width: document.documentElment.clientWidth,
    height: document.documentElemnt.clientHeight
  }
}
}


// 确定文档高度
// 怪异模式时用document.body
function getDocWH(){
  if(document.compatMode == "backCompat"){
   return {
    docHeight: Math.max(document.body.scrollHeight, document.body.clientHeight),
    docWidht: Math.max(document.body.scrollWidth, document.body.clientWidth)
  }
}else{
    // document.compatMode == "CSS1Compat"
    return {
      docHeight: Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight),
      docWidth: Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth)
    }
  }
}

// getBoundingClientRect()方法返回一个对象,对象具有left,right,top,bottom四个属性
// 由于IE8-认为文档的左上角坐标是（2,2），其他浏览器则为(0,0)

 //在严格模式下不可用，由于用到了arguments.callee
 function getBoundingClientRect(element){
  var scrollTop = document.body.scrollTop;
  var scrollLeft = document.body.scrollLeft;
  if (element.getBoundingClientRect) {
    if (typeof arguments.callee.offset != "number") {
      var temp = document.createElement('div');
      temp.style.cssText = "position:absolute;top:0;left:0;";
      document.body.appendChild(temp);
      // offset用于纠正IE8-中的不一致
      // - scrollTop处理的是页面被滚动的情况
      arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
      document.body.removeChild(temp);
      temp = null;
    }
    var rect = element.getBoundingClientRect();
    var offset = arguments.callee.offset;
    return {
      left: rect.left + offset,
      right: rect.right + offset,
      top: rect.top + offset,
      bottom: rect.bottom + offset
    }
  }else{
    var actualLeft = getElementLeft(element);
    var actualTop = getElementTop(element);
    return {
      left:actualLeft - scrollLeft,
      right: actualLeft -scrollLeft + element.offsetWidth,
      top: actualTop -scrollTop,
      bottom: actualTop - scrollTop + element.offsetHeight
    }
  }
}

(function (){
  function draw(timestamp){
    // 计算两次重回的时间间隔
    var drawStart = (timeStamp || Date.now()),
    diff = drawStart - startTime;
    // 使用diff确定下一步的绘制时间
    // 把startTime重写为这一次的绘制时间
    startTime = drawStart;
    // 重绘UI
    requestAnimationFrame(draw);
  }
  var requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame||
  window.webkitRequestAnimationFrame||
  window.msRequestAnimationFrame,
  statTime = window.mozAnimationStartTime || Date.now();
  requestAnimationFrame(draw);
})()

// 获取地理位置绘制地图

navigator.geolocation.getCurrentPosition(function (position){
  drawMapCenteredAt(position.coords.latitude, position.coords.longitude);
},function (error){
  console.log("Error code "+ error.code);
  console.log("Error message" + error.message);
},{
  enableHighAccuracy: true,
  timeout: 500,
  maximumAge: 25000
})

var watchId = navigator.geolocation.watchPosition(function (position){
  drawMapCenteredAt(position.coords.latitude, position.coords.longitude);
},function (error){
  console.log("Error code "+ error.code);
  console.log("Error message" + error.message);
})
clearWatch(watchId)

// 文件API
var fileList = document.getElementById("files-list");
EventUtil.addHandler(fileList, "change",function (event){
  var info = "",
  output = document.getElementById("output"),
  progress = document.getElementById("progress"),
  files = EventUtil.getTarget(event).files,
  type = "default",
  reader = new FileReader();

  if(/image/.test(files[0].type)){
   reader.readAsDataURL(files[0]);
   type = "image";
 }else{
   reader.readAsText(files[0]);
 }
 reader.onerror = function (){
   output.innerHTML = "Could not read file, error code is "+
   reader.error.code;
 }
 reader.onprogress = function (event){
   if (event.lengthComputable) {
     output.innerHTML = event.loaded + "/"+ event.total;
   }
 }
 reader.onload = function (){
   var html = "";
   switch(type){
     case "image":
     html = "<img src=\""+reader.result + "\">";
     break;
     case "text":
     html = reader.restul;
     break;
   }
   output.innerHTML = html;
 }
})

// 读取部分文件内容


function blobSlice(blob, startByte, length){
  if (blob.slice) {
    return blob.slice(startByte, length);
  }else if(blob.webkitSlice){
    return blob.webkitSlice(startByte, length);
  }else if (blob.mozSlice) {
    return blob.mozSlice(startByte, length);
  }else {
    return null;
  }
}
var fileList = document.getElementById("files-list");


EventUtil.addHandler(fileList, "change",function (event){
  var info = "",
  output = document.getElementById("output"),
  progress = document.getElementById("progress"),
  files = EventUtil.getTarget(event).files,
  type = "default",
  reader = new FileReader(),
  blob = blobSlice(files[0], 0, 32)

  if (blob) {
    reader.readAsText(blob);
    reader.onerror = function (){
      ouput.innerHTML = "Could not read file, error code is"+
      reader.error.code;
    };
    reader.onload = function (){
      output.innerHTML = reader.result;
    }
  }else{
    alert("Your browser doesnt support slice()");
  }
})
// 对象URL
 
function createObjectURL(blob){
  if (window.URL) {
     return window.URL.createObjectURL(blob);
  }else if (window.webkitURL) {
     return window.webkitURL.createObjectURL(blob);
  }else{
     return null;
  }
}
 
var fileList = document.getElementById("files-list");
EventUtil.addHandler(fileList, "change",function (event){
  var info = "",
       output = document.getElementById("output"),
       progress = document.getElementById("progress"),
       files = EventUtil.getTarget(event).files,
       type = "default",
       reader = new FileReader(),
       url = createObjectURL(files[0]);
  if (url) {
     if (/image/.test(files[0].type)) {
       output.innerHTML = "<img src\"" + url + "\">";
     }else{
       output.innerHTML = "Not an image.";
     }
  }else{
     output.innerHTML = "Your browser dosent support object URLs";
  }
})
 function revokeObjectURL(url){
  if (window.URL) {
     window.URL.revokeObjectURL(url);
  }else if (window.webkitURL) {
     window.webkitURL.revokeObjectURL(url);
  }
}

// 读取拖放文件
var dropstart = document.getElementById("droptarget");
function handleEvent(event){
  var info = "",
       output = document.getElementById("output"),
       files, i, len;
  Event.preventDefault(event);
  if (event.type == "drop") {
     files = event.dataTransfer.files;
     i = 0;
     len = files.length;
 
     while(i<len){
       info += files[i].name + "(" + files[i].type + "," + files[i].size + "bytes)<br>";
          i++;
     }
     output.innerHTML = info;
  }
}
 
// 必须取消dragenter dragover 和drop的默认行为
EventUtil.addHandler(droptarget, "dragenter", handleEvent);
EventUtil.addHandler(droptarget, "dragover", handleEvent);
EventUtil.addHandler(droptarget, "drop", handleEvent);

// 使用XHR上传文件
var dropstart = document.getElementById("droptarget");
function handleEvent(event){
  var info = "",
       output = document.getElementById("output"),
       data, xhr,
       files, i, len;
  Event.preventDefault(event);
  if (event.type == "drop") {
     data = new FormData();
     files = event.dataTransfer.files;
     i = 0;
     len = files.length;
 
     while(i<len){
          data.append("file"+i, files[i]);
          i++;
     }
     xhr = new XMLHttpRequest();
     xhr.open("post", "FileAPIExample.php", true);
     xhr.onreadystatechange = function (){
       if (xhr.readystate == 4) {
          console.log(xhr.responseText)
       }
     }
     xhr.send(data);
  }
}
 
// 必须取消dragenter dragover 和drop的默认行为
EventUtil.addHandler(droptarget, "dragenter", handleEvent);
EventUtil.addHandler(droptarget, "dragover", handleEvent);
EventUtil.addHandler(droptarget, "drop", handleEvent);
 
 
function createXHR(){
  if (typeof XMLHttpRequest !== "undefined") {
     return new XMLHttpRequest();
  }else if(typeof ActiveXObject != "undefined"){
     if (typeof arguments.callee.activeXString != "string") {
       var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"], i, len;
       for(i = 0, len = version.length; i<len; i++){
          try{
            new ActiveXObject(version[i]);
            arguments.callee.activeXString = version[i];
            break;
          }catch(e){
            // 跳过
          }
       }
     }
     return new ActiveXObject(arguments.callee.activeXString);
  }else{
     throw new Error("No XHR object available");
  }
}
 
 
var xhr = createXHR();
xhr.onreadystatechange = function (){
  if (xhr.readyState == 4) {
     if (xhr.status >= 200 && xhr.status <300 || xhr.status == 304) {
       console.log(xhr.responseText)
     }else{
       console.log("Request was unsuccessful:"+xhr.status);
     }
  }
}
// 可以用DOM2的onload方法
xhr.onload = function (){
  if (xhr.status >= 200 && xhr.status <300 || xhr.status == 304) {
       console.log(xhr.responseText)
     }else{
       console.log("Request was unsuccessful:"+xhr.status);
     }
}
// DOM2的FormData
var data  = new FormData();
// var data = new FormData(formObject);
// data.append(key,value)
data.append("name","clfeng")
 
//预备一个请求
xhr.open("get","/login",true);
xhr.setHeader({"Accept":"text/plain"});
xhr.send(null);

// ajax跨域
function createCORSRequest(method, url){
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
     xhr.open(method, url, true);
  }else if(typeof XDomainRequest != "undefined"){
     xhr = new XDomainRequest();
     xhr.open(method, url);
  }else{
     xhr = null;
  }
  return xhr;
}
 
 
var request = createCORSRequest("get","http://www.somewhere-else.com/page");
if (request) {
  request.onload = function (){
     // 对request.responseText进行处理
  };
  request.send();
}
