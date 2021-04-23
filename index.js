const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const app = express();
const corsOptions = {
    origin: '*'
}

const Command = require('./models/Command');
const command = new Command();

app.use( express.static( "assets" ) );
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.render('status200.ejs');
})

app.get('/command', (req, res) => {
    res.send(command.getCurrent());
})

app.post('/command', (req, res) => {
    command.updateCommand(req.body);

    console.log('[Command is updated]')
    res.send(command.getCurrent());
});

app.use((req, res) => {
    res.render('status404.ejs')
    res.status(404)
    res.send({ error: 'Route not found' })
})
 
const server = new WebSocket.Server({ 
    server: app.listen(process.env.PORT || 5000,
        () => {
            console.log("--Servidor iniciado com sucesso--")
            console.log(`--Porta: ${process.env.PORT || 5000}`)
        })
});
