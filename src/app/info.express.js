//info.express.js

var express = require("express");
var fs = require("fs");

var app = express();

// Logging server requests
app.use(function(request, response, next){
     
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n");
    next();
});

app.use(function (request, response, next) {
	response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/public/:info", function (request, response) {

	var filePath = `public/${request.params['info']}.html`;

	fs.readFile(filePath, "utf8", function(error, data){
             
		if(error) {
			response.statusCode = 404;
			let e404 = {
				code: 404,
				text: 'Page not found'
			}
			response.send(JSON.stringify(e404));
		} else {
			let article = {
				code: 200,
				text: data
			}
			response.send(JSON.stringify(article));
		}
	});
});
 
app.listen(3000);