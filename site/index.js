const express = require('express')
const app = express();
const path = require('path');
const config = require('config');
const debug = require('debug')('linkq:server');

const server = require('http').Server(app);

const socketlib = require('./server/socketlib');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));

app.use((request, response, next) => {
	debug(`Connection from: ${request.url}`);
	response.header("Access-Control-Allow-Origin", config.socket.host);
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (request, response) => {
	response.sendFile(path.resolve('index.html'));
});

socketlib.init(server)
.catch(e => {
	debug(e);
});

server.listen(3200);
debug('Listening on port 3200');
