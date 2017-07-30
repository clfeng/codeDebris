var http = require('http');
var express = require("express");
var app =new express(); 

app.use(express.static(__dirname+'/public'));

http.createServer(app).listen('8000',function (){
	console.log('the server run on 8000');
});
