const express = require("express");
const server = express();
const helmet = require("helmet");
const projectRouter = require("./projects/projectRouter.js");
const actionRouter = require("./actions/actionRouter");


server.use(helmet());
server.use(express.json());
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);


server.get('/', (req, res) => {
    res.send(`<h2>Let's pass this Sprint!</h2>`);
});

module.exports = server; 