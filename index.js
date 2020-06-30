const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser'); 
const Command = require('./models/Command');
const command = new Command();
const app = express();

app.use(bodyParser.json());

app.post('/command', (req, res, next) => {
    command.updateCommand(req.body);

    console.log(command);

    res.send(req.body);
});
 
const server = new WebSocket.Server({ 
    server: app.listen(8080, () => console.log("--Servidor iniciado com sucesso--"))
});
