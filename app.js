const express = require("express");
const app = express();
const {getTopics, catchAll} = require("./controllers/topics.controllers");
const { handleCustomErrors, handlePsqlErrors} = require("./errors");

app.use(express.json());

app.get("/api/topics", getTopics);

app.all("*",catchAll)

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;
