const db = require("../db/connection");
const format = require("pg-format");


exports.selectArticleById = (article_id) => {
  return db.query(`
  SELECT * FROM articles
  WHERE article_id = $1;`,[article_id])
  .then(({rows : articleRow}) => {
    if (articleRow.length < 1){
        return Promise.reject({status: 404, msg : "Article with that Id does not exist!"})
    }
    return articleRow
  })
};

