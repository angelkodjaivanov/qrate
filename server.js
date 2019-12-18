/*server.js*/
const port         = 3000;
const fs           = require('fs');
const express      = require('express');
const bodyParser   = require('body-parser');
const app          = express();

//set up mongo client
const MongoClient  = require('mongodb').MongoClient;
const url          = 'mongodb://localhost/test';
let   collection;
MongoClient.connect(url, (err, cli) => {
	if(err) throw err;
	else console.log('mongodb connected');

	const db = cli.db('qrate');
	collection = db.collection('paintings');
	collection.createIndex({'id': 1}, {unique: true});
});

app.use(bodyParser.json());
app.use(express.static('static'));
app.use(express.static('node_modules/qr-scanner'));
app.use(express.static('node_modules/noty'));

app.get('/gallery', (req, res) => {
	res.sendFile(__dirname + '/static/gallery.html');
});

app.get('/addinfo', (req, res) => {
	//TODO: security & data validity check
	req.query.pass == 38132874 ? res.sendFile(__dirname + '/static/addinfo.html') : null;
	
});
app.post('/addinfo/38132874', (req, res) => {
	//TODO: security & data validity check
	collection.insertOne({id: req.body.id, name: req.body.name, text: req.body.text});
	res.json({status:200});
});
app.get('/addinfo/list/38132874', (req, res) => {
	const data = collection.find().toArray((err, docs) => {
		res.json({body:docs});
	});
});

const server = app.listen(port, () => {
	console.log('Listening on', port);
});
