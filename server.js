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

const online_users = new Map();

io.on('connection', socket => {

    logger.info(`{module: server.js} [io.on connection] ${socket.id} connected`);

    socket.on('user-landed', (userid) => {

        if (!online_users.has(userid)) {
            online_users.set(userid, {
                available: true,
                socketIds: new Set()
            });
        };

        online_users.get(userid).socketIds.add(socket.id);

        io.emit('online-user-count', online_users.size);

        if (online_users.get(userid) === undefined) {
            logger.info(`{module: server.js} [io.on connection] [new-user] ${userid} landed on id - ${socket.id}, Complete details: ${JSON.stringify({
                userid: userid,
                isAvailable: true,
                socketIds: [socket.id]
            })}`);
        } else {
            const existingUser = online_users.get(userid);
            logger.info(`{module: server.js} [io.on connection] [existing-user] ${userid} landed on id - ${socket.id}, Complete details: ${JSON.stringify({
                userid: userid,
                isAvailable: existingUser.isAvailable,
                socketIds: Array.from(existingUser.socketIds)
            })}`);
        }

    });

    socket.on('disconnect', () => {
        logger.info(`{module: server.js} [io.on connection] ${socket.id} disconnected`);

        for (const [userid, data] of online_users.entries()) {
            data.socketIds.delete(socket.id);

            if (data.socketIds.size === 0) {
                online_users.delete(userid);
            };
        };

        io.emit('online-user-count', online_users.size);
    });

});

app.get('/', function (req, res) {
    logger.info(`{module: server.js} [app.get /] ENTRY`);
    res.send(`There are ${online_users.size} users online.`);
    logger.info(`{module: server.js} [app.get /] EXIT`);
});

server.listen(PORT, function () {
    logger.info('✅ THIS SERVICE IS FOR REAL-TIME TRACKING OF NUMBER OF USERS. Listening on port ' + PORT);
});