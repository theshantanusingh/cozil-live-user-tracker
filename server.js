const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const logger = require("./utils/logger.utility");
const PORT = require("./config/env.config").port;
const ORIGIN = require("./config/env.config").incomingurl;

logger.info(`{module: server.js} ENTRY`);

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// ✅ Enable JSON parsing
app.use(express.json());

// ✅ Fix CORS: allow actual headers not values
app.use(cors({
    origin: ORIGIN,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'], // correct header
    credentials: false
}));

app.use(helmet());
app.use(morgan('combined'));

logger.info(`{module: server.js} inited all variables. Now working on main logic.`);

const online_users = new Set();

io.on('connection', socket => {

    logger.info(`{module: server.js} [io.on connection] ${socket.id} connected`);

    socket.on('user-landed', () => {
        logger.info(`{module: server.js} [io.on connection] [new-user] ${socket.id} joined`);
        online_users.add(socket.id);
    })

    socket.on('disconnect', () => {
        logger.info(`{module: server.js} [io.on connection] ${socket.id} disconnected`);
        online_users.delete(socket.id);
    });

})

app.get('/', function(req, res) {
    logger.info(`{module: server.js} [app.get /] ENTRY`);
    res.send('Hello World!');
    logger.info(`{module: server.js} [app.get /] EXIT`);
});

app.get('/online-user', function(req, res){
    logger.info(`{module: server.js} [app.get /online-user] ENTRY`);
    res.send(`There are ${online_users.size} users online.`);
    logger.info(`{module: server.js} [app.get /online-user] EXIT`);
})

server.listen(PORT, function(){
    logger.info('✅ THIS SERVICE IS FOR REAL-TIME TRACKING OF NUMBER OF USERS. Listening on port ' + PORT);
});