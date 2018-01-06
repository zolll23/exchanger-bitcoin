//info.express.js

const express = require("express");
const cors = require('cors');
const body_parser = require('body-parser');
const fs = require("fs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/bitcoinbycard");

const orderSchema = new mongoose.Schema({
	id:String,
	give:String,
	amount_give:String,
	receive:String,
	amount_receive:String,
	email:String,
	phone:String,
	date:String,
	address:String,
	serial:String,
	month:String,
	year:String,
	code:String,
	cardholder:String
	});

var Orders = mongoose.model("Orders", orderSchema);

var app = express();

app.use(cors());
app.options('*', cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));


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

app.post("/orders",function (request, response) {
	console.log(request.body);
	var myData = new Orders(request.body);
	myData.save().then(item => {
		response.send('Ok');
	}).catch (err => {
		response.status(400).send('Error');
	});
	
});
 
app.listen(3000);