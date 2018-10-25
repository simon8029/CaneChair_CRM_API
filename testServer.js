const express = require('express');
const app = express();
const mongodb = require('mongodb');

const PORT = 8139;
const client = mongodb.MongoClient;

client.connect(
	'mongodb://mongo:27017/newdock',
	function(err, db) {
		if (err) {
			console.log('database is not connected');
		} else {
			console.log('connected!!');
		}
	}
);

app.get('/', function(req, res) {
	res.json({ hello: 'world' });
});

app.listen(PORT, function() {
	console.log('Your node js server is running on PORT:', PORT);
});
