const express = require("express");
const app = express();
const {getEndpoints, catchAll} = require("./controllers/api.controllers")
const {getTopics} = require("./controllers/topics.controllers");
const {getArticles,getArticleById,getCommentsByArticleId} = require("./controllers/articles.controllers")
const {handleCustomErrors, handlePsqlErrors} = require("./errors");


app.get("/api", getEndpoints)

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.all("*",catchAll)

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;
