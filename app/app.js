var express = require('express');
var app = express();
// http://localhost:8081/css/index.css
// app.use 中间件 访问静态文件目录
app.use(express.static('public'));
app.get('/index.html', function (req, res) {
	res.sendFile(__dirname + '/views/' + 'index.html');
});
var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log(host);
});
