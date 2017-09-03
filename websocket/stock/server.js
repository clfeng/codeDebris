var WebSocketServer = require("ws").Server,
wss = new WebSocketServer({port: 8181});
var stocks = {
  "AAPL": 95.0,
  "MSFT": 50.0,
  "AMZN": 300.0,
  "GOOG": 550.0,
  "YHOO": 35.0
};

// 生成随机数
function randomInterval(min, max){
  return Math.floor(Math.random()*(max - min) +min);
}

var stockUpdater;
var randomStockUpdater = function(){
  for(var symbol in stocks){
    if (stocks.hasOwnProperty(symbol)) {
      var randomizedChange = randomInterval(-150, 150);
       var floatChange = randomizedChange / 100;
      stocks[symbol] += floatChange;
    }
  }
  var randomMSTime = randomInterval(500,2500);
  stockUpdater = setTimeout(function (){
    randomStockUpdater();
  },randomMSTime)
}
randomStockUpdater();


// 存储客户端索要数据段的数据对象
var clientStocks = [];
wss.on("connection",function (ws){
  var clientStockUpdater = setInterval(function (){
    sendStockUpdates(ws)
  },1000)
  function sendStockUpdates(ws){
  // 判断处于链接状态
  if (ws.readyState == 1) {
      // 将要发送给客户端的数据对象
      var stocksObj = {};
      for(var i = 0; i<clientStocks.length; i++){
        var symbol = clientStocks[i];
        stocksObj[symbol] = stocks[symbol];
      }
      if (stocksObj.length !== 0) {
        ws.send(JSON.stringify(stocksObj));
        console.log("更新", JSON.stringify(stocksObj));
      }
    }
  }
  ws.on("message",function (message){
    var stockRequest = JSON.parse(message);
    // 保存客户所需要的数据段
    clientStocks = stockRequest['stocks'];
    sendStockUpdates(ws);
  })
  ws.on("close",function (){
    if (typeof clientStockUpdater != 'undefined') {
      clearInterval(clientStockUpdater);
    }
  })
})




