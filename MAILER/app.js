var http = require("http");
var express = require('express');
var app = express();
//var mysql      = require('mysql');
var bodyParser = require('body-parser');

/*	
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : '',
database : 'ci'
});


connection.connect(function(err) {
if (err) throw err
console.log('You are now connected with mysql database...')
})*/
/*
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
extended: true
}));
*/



app.use(express.json());


app.listen(3000,()=>{
console.log("Srever up and running at port 3000");
})

//rest api to get all customers
app.get('/', function (req, res) {
var results = [111,222,3222,'Om Kumar Yadav'];
console.log(req);
res.end(JSON.stringify(results));
});


/////////  npm install --save express mysql body-parser hbs nodemon

