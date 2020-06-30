const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

app.use(bodyParser.json());


 
const server = new WebSocket.Server({ server: app.listen(8080) });
