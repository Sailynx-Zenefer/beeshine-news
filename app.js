const express = require("express");
const app = express();
const {getEndpoints, catchAll} = require("./controllers/api.controllers")
const {getTopics} = require("./controllers/topics.controllers");
const { handleCustomErrors, handlePsqlErrors} = require("./errors");

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics);

app.all("*",catchAll)

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;
