'use strict';
const cl = console.log
const express = require('express');
                // bodyParser = require('body-parser'),
                // cors = require('cors'),
                // mongodb = require('mongodb')

const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');

const app = express();

const http = require('http').Server(app);
const serverRoot = 'http://localhost:4000/graphql';
const baseUrl = serverRoot + 'data';

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true
}));

// Note: app.listen will not work with cors and the socket
// app.listen(4000, function () {
http.listen(4000, function () {
	console.log(`graphql server is ready at ${baseUrl}`);
});












// function dbConnect() {

// 	return new Promise((resolve, reject) => {
// 		// Connection URL
// 		var url = 'mongodb://localhost:27017/seed';
// 		// Use connect method to connect to the Server
// 		mongodb.MongoClient.connect(url, function (err, db) {
// 			if (err) {
// 				cl('Cannot connect to DB', err)
// 				reject(err);
// 			}
// 			else {
// 				//cl('Connected to DB');
// 				resolve(db);
// 			}
// 		});
// 	});
// }