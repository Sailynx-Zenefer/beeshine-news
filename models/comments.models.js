const db = require("../db/connection");
const format = require("pg-format");

exports.selectCommentsByArticleId = (article_id) => {
    return db.query(`
      SELECT * FROM comments
      WHERE article_id = $1
      ORDER BY created_at DESC;`,[article_id])
  };
  
exports.insertCommentByArticleId = ({username,body}, article_id) => {
      return db.query(
          `INSERT INTO comments
                      (body, author, article_id)
                      VALUES
                      ($1,$2,$3)
                      RETURNING *;`,
                      [body, username, article_id]
        )
  }
  
exports.dbDeleteCommentByCommentId = (comment_id) => {
  return db.query(`
  DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *;`,
  [comment_id])
}