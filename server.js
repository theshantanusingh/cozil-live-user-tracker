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
    origin: ORIGIN, // fallback to "*" for dev if undefined
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'], // correct header
    credentials: false
}));

app.use(helmet());
app.use(morgan('combined'));

logger.info(`{module: server.js} inited all variables. Now working on main logic.`);

app.get('/', function(req, res) {
    logger.info(`{module: server.js} [app.get /] ENTRY`);
    res.send('Hello World!');
    logger.info(`{module: server.js} [app.get /] EXIT`);
});

server.listen(PORT, function(){
    logger.info('✅ THIS SERVICE IS FOR REAL-TIME TRACKING OF NUMBER OF USERS. Listening on port ' + PORT);
});