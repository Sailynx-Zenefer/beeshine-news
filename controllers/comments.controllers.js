const { forEach } = require("../db/data/test-data/articles");
const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
} = require("../models/comments.models");
const {
  checkCommentFormat,
  checkArticleIdExists,
  checkUserNameExists,
} = require("../utils");


exports.getCommentsByArticleId = ({ params: { article_id } }, res, next) => {
    return Promise.all([
      checkArticleIdExists(article_id),
      selectCommentsByArticleId(article_id),
    ])
      .then(([article_idCheck, { rows: commentsRows }]) => {
        if (article_idCheck) {
          res.status(200).send({ comments: commentsRows });
        } else {
          return Promise.reject({
            status: 404,
            msg: "Article with that Id does not exist, nor are there any comments with a matching article Id!",
          });
        }
      })
      .catch(next);
  };
  
  exports.postCommentByArticleId = (
    { body: comment, params: { article_id } },
    res,
    next
  ) => {
    return Promise.all([
      checkCommentFormat(comment),
      checkArticleIdExists(article_id),
      checkUserNameExists(comment.username),
    ])
      .then(([commentValid, articleExists, usernameExists]) => {
        if (commentValid[0]) {
          if (articleExists && usernameExists) {
            return insertCommentByArticleId(comment, article_id).then(
              ({ rows: [commentPosted] }) => {
                res.status(201).send({ comment: commentPosted });
              }
            );
          } else if (!articleExists && usernameExists) {
            return Promise.reject({
              status: 404,
              msg: "Article with that Id does not exist, therefore you cannot post to it!",
            });
          } else if (articleExists && !usernameExists) {
            return Promise.reject({
              status: 400,
              msg: "username not registered, please use another!",
            });
          } else {
            return Promise.reject({
              status: 404,
              msg: "Article with that Id does not exist, nor is username registered",
            });
          }
        } else {
          return Promise.reject({
            status: 400,
            msg: `Invalid Comment Format!`,
          });
        }
      })
      .catch(next);
  };