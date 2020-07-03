const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const  cors = require('cors');
const corsOptions = {
    origin: '*'
}

const Command = require('./models/Command');
const command = new Command();

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('', (req, res) => {
    res.send('Servidor Funcionando');
})

app.get('/command', (req, res) => {
    res.send(command.getCurrent());
})

app.post('/command', (req, res) => {
    command.updateCommand(req.body);

    console.log('[Command is updated]')
    res.send(command.getCurrent());
});
 
const server = new WebSocket.Server({ 
    server: app.listen(8080, () => console.log("--Servidor iniciado com sucesso--"))
});
