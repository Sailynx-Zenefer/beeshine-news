const db = require("./db/connection");

exports.checkCommentFormat = (comment) => {
  return [
    Object.keys(comment).length === 2 &&
      typeof comment.body === "string" &&
      typeof comment.username === "string",
    Object.keys(comment),
  ];
};

exports.checkArticleIdExists = (article_id) => {
    return db
    .query(
      `
    SELECT articles.article_id, comments.article_id FROM articles FULL JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id =$1 OR comments.article_id = $1;`,
      [article_id]
    )
    .then(({ rows: article_idRows }) => {
      return article_idRows.length > 0;
    })
};

exports.checkUserNameExists = (username) => {
  return db
    .query(
      `
    SELECT username FROM users
    WHERE username = $1`,
      [username]
    )
    .then(({ rows: usernameExists }) => {
      return usernameExists.length > 0;
    });
};

exports.checkVoteObj = (voteObj) => {
  validVoteObj = Object.keys(voteObj).length === 1 && typeof voteObj.inc_votes === "number"
  return validVoteObj
};

exports.listTopics = () => {
  return db
    .query(`SELECT slug FROM topics;`)
    .then(({rows : topicsRows}) => {
      return validTopics = topicsRows.map((topic) => topic.slug)
    })
};

exports.listArticleColumns = () => {
  return db
    .query(`SELECT column_name FROM information_schema.columns
     WHERE table_name='articles';`)
    .then(({rows : columns}) => {
      return articlesColumns = columns.map((column) => column.column_name)
    })
};
