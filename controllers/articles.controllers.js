const {
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
} = require("../models/articles.models");

const { checkArticleIdExists } = require("../utils");

exports.getArticles = (req, res, next) => {
  return selectArticles()
    .then((articleRows) => {
      res.status(200).send({ articles: articleRows });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const {
    params: { article_id },
  } = req;
  return selectArticleById(article_id)
    .then((articleRow) => {
      res.status(200).send({ article: articleRow });
    })
    .catch(next);
};

exports.getCommentsByArticleId = ({params : {article_id}}, res, next) => {
  return Promise.all([
    checkArticleIdExists(article_id),
    selectCommentsByArticleId(article_id),
  ])
    .then(([article_idCheck, {rows:commentsRows}]) => {
      if (article_idCheck.length) {
        if(commentsRows.length){
          res.status(200).send({ comments: commentsRows });
        }else {
          return Promise.reject({
            status: 404,
            msg: "There are no comments for an article with that Id!",
        });}
        
      }else {
        return Promise.reject({
          status: 404,
          msg: "Article with that Id does not exist, nor are there any comments with a matching article Id!",
        });
      }
    })
    .catch(next);
};
