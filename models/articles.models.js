const db = require("../db/connection");
const {
  checkArticleIdExists,
  checkVoteObj,
  listTopics,
  listArticleColumns,
} = require("../utils");

exports.selectArticles = (query) => {
  let queryStr = `
    SELECT articles.article_id,title,topic,articles.author,articles.created_at,
    articles.votes,article_img_url, COUNT(comment_id) ::INT as comment_count 
    FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id `;
  const queryVals = [];
  return Promise.all([listTopics(), listArticleColumns()]).then(
    ([topicList, articleColumnList]) => {
      if (Object.keys(query).length === 1) {
        const queryKey = Object.keys(query)[0];
        queryVals.push(query[queryKey]);
        if (
          topicList.includes(queryVals[0]) &&
          articleColumnList.includes(queryKey)
        ) {
          queryStr += ` WHERE ${queryKey} = $1`;
        } else {
          return Promise.reject({
            status: 400,
            msg: `Invalid query!`,
          });
        }
      }
      queryStr += ` GROUP BY articles.article_id ORDER BY created_at DESC;`;
      return db.query(queryStr, queryVals);
    }
  );
};

exports.selectArticleById = (article_id) => {
  return db
    .query(
      `
      SELECT articles.article_id,title,topic,articles.author,articles.body,articles.created_at,
      articles.votes,article_img_url, COUNT(comment_id) ::INT as comment_count 
      FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id;`,
      [article_id]
    )
    .then(({ rows: articleRow }) => {
      if (articleRow.length < 1) {
        return Promise.reject({
          status: 404,
          msg: "Article with that Id does not exist!",
        });
      }
      return articleRow;
    })
};

exports.updateNewVoteByArticleId = (voteObj, article_id) => {
  return Promise.all([
    checkArticleIdExists(article_id),
    checkVoteObj(voteObj),
  ]).then(([articleExists, validVoteObj]) => {
    if (!articleExists) {
      return Promise.reject({
        status: 404,
        msg: "Article with that Id does not exist, nor can votes be added to it!",
      });
    }
    if (!validVoteObj) {
      return Promise.reject({
        status: 400,
        msg: "Invalid vote object recieved!",
      });
    }
    return db.query(
      `
    UPDATE articles
    SET
      votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`,
      [voteObj.inc_votes, article_id]
    );
  });
};
