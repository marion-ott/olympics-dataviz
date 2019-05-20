const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;

const mysql = require('mysql');

// DB
const username = 'root'
const password = '@Cc15091963'
const host = 'localhost'
const database = 'olympics'

// connection configurations
const conn = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database
});


conn.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/approutes'); //importing route
routes(app); //register the route

