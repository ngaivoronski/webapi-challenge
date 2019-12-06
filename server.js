const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projectRouter = require('./data/api/projectRouter');
const actionRouter = require('./data/api/actionRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`<h2>Server works!</h2>`);
});

//custom middleware

function logger(req, res, next) {
    const timestamp = new Date();
    console.log(`${req.method} to ${req.originalUrl} at ${timestamp}`);
    next();
}

server.use('/api/projects', helmet(), projectRouter);
server.use('/api/actions', helmet(), actionRouter);

module.exports = server;
