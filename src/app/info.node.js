// info.node.js
var http = require("http");
var fs = require("fs");

http.createServer(function(request, response) {

    console.log(`Запрошенный адрес: ${request.url}`);

    if (request.headers.origin) {
        response.setHeader('Access-Control-Allow-Origin', '*')
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (request.method === 'OPTIONS') return response.send(200)
    }

    if(request.url.startsWith("/public/")) {
         
		// получаем путь после слеша
		var filePath = request.url.substr(1)+'.html';
		console.log(filePath);

		fs.readFile(filePath, "utf8", function(error, data){
                 
        	if(error) {
				response.statusCode = 404;
				let e404 = {
					code: 404,
					text: 'Page not found'
				}
				response.end(JSON.stringify(e404));
			} else {
				let article = {
					code: 200,
					text: data
				}
                response.end(JSON.stringify(article));
			}
    	});
    }
}).listen(3000);