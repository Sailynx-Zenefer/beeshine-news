const db = require("../db/connection");
const format = require("pg-format");
const {
  checkArticleIdExists,
  checkVoteObj
} = require("../utils");

exports.selectArticles = () => {
  return db.query(`
  SELECT articles.article_id,title,topic,articles.author,articles.created_at,articles.votes,article_img_url,
  COUNT(comment_id) ::INT as comment_count 
  FROM articles JOIN comments ON comments.article_id = articles.article_id
  GROUP BY articles.article_id ORDER BY created_at DESC;`)
  .then(({rows : articleRows}) => {
    if (articleRows.length < 1){
        return Promise.reject({status: 404, msg : "No articles currently exist..."})
    }
    return articleRows
  })
};
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

exports.updateNewVoteByArticleId = (voteObj,article_id) => {
  return Promise.all([
    checkArticleIdExists(article_id),
    checkVoteObj(voteObj),
  ])
  .then(([articleExists,validVoteObj]) => {
    if(!articleExists){
      return Promise.reject({status: 404, msg : "Article with that Id does not exist, nor can votes be added to it!"})
    }
    if(!validVoteObj){
      return Promise.reject({status: 400, msg : "Invalid vote object recieved!"})
    }
    return db.query(`
    UPDATE articles
    SET
      votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`,[voteObj.inc_votes,article_id])
  })
}

