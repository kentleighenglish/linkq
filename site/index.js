const express = require('express')
const app = express();
const path = require('path');
const config = require('config');
const debug = require('debug')('linkq:server');

const server = require('http').Server(app);

server.listen(3200);
debug('Listening on port 3200');

const socketlib = require('./server/socketlib');

socketlib.init(server)
.catch(e => {
	debug(e);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (request, response) => {
	response.sendFile(path.resolve('index.html'));
});
