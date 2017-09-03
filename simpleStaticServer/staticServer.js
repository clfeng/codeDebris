var http = require("http"),
		url = require("url"),
		path = require("path"),
		fs = require("fs");
const ROOT = "./"
http.createServer(function (req, res){
	var pathname = url.parse(req.url).pathname;
	console.log(pathname);
	fs.readFile(path.join(ROOT, pathname), function (err, file){
		if (err) {
			res.writeHead(404);
			res.end("找不到文件")
			return;
		}
		res.writeHead(200);
		res.end(file);
	})
}).listen(8081);
