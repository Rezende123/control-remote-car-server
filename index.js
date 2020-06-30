const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

const Command = require('./models/Command');
const command = new Command();

app.use(bodyParser.json());

app.post('/command', (req, res, next) => {
    command.updateCommand(req.body);

    res.send(command);
});
 
const server = new WebSocket.Server({ 
    server: app.listen(8080, () => console.log("--Servidor iniciado com sucesso--"))
});
