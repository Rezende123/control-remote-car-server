const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

const Command = require('./models/Command');
const command = new Command();

app.use(bodyParser.json());

app.get('/command', (req, res) => {
    res.send(command.getCurrent());
})

app.post('/command', (req, res) => {
    command.updateCommand(req.body);

    res.send(command.getCurrent());
});
 
const server = new WebSocket.Server({ 
    server: app.listen(8080, () => console.log("--Servidor iniciado com sucesso--"))
});
