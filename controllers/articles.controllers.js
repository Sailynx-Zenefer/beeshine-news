const { forEach } = require("../db/data/test-data/articles");
const {
  selectArticleById,
  selectArticles,
} = require("../models/articles.models");

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


