const db = require("./db/connection");

exports.checkArticleIdExists = (article_id) => {
    return db.query(`
    SELECT articles.article_id, comments.article_id FROM articles FULL JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id =$1 OR comments.article_id = $1;`,[article_id])
    .then(({rows : article_idRows}) => {
            return article_idRows
    })
}