const express = require("express");
const app = express();
const {getEndpoints, catchAll} = require("./controllers/api.controllers")
const {getTopics} = require("./controllers/topics.controllers");
const {getUsers} = require("./controllers/users.controllers");
const {
    getArticles,
    getArticleById,
    patchNewVoteByArticleId
} = require("./controllers/articles.controllers")
const {
    getCommentsByArticleId,
    postCommentByArticleId,
    srvDeleteCommentByCommentId
} = require("./controllers/comments.controllers")
const {handleCustomErrors, handlePsqlErrors} = require("./errors");
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id", getArticleById)

app.patch("/api/articles/:article_id", patchNewVoteByArticleId)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.post("/api/articles/:article_id/comments", postCommentByArticleId)

app.delete("/api/comments/:comment_id", srvDeleteCommentByCommentId)

app.all("*",catchAll)

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;
