const db = require("../db/connection");

const {checkCommentFormat,
checkArticleIdExists,
checkUserNameExists} = require("../utils");

exports.selectCommentsByArticleId = (article_id) => {
    return db.query(`
      SELECT * FROM comments
      WHERE article_id = $1
      ORDER BY created_at DESC;`,[article_id])
  };
  
exports.insertCommentByArticleId = (comment, article_id) => {
  return Promise.all([
    checkCommentFormat(comment),
    checkArticleIdExists(article_id),
    checkUserNameExists(comment.username),
  ])
    .then(([commentValid, articleExists, usernameExists]) => {
      if (commentValid[0]) {
        if (articleExists && usernameExists) {
          return db.query(
            `INSERT INTO comments
                        (body, author, article_id)
                        VALUES
                        ($1,$2,$3)
                        RETURNING *;`,
                        [comment.body, comment.username, article_id]
          )
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
  }
  
exports.dbDeleteCommentByCommentId = (comment_id) => {
  return db.query(`
  DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *;`,
  [comment_id])
}