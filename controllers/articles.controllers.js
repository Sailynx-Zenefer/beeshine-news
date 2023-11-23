const { forEach } = require("../db/data/test-data/articles");
const {
  selectArticleById,
  selectArticles,
  updateNewVoteByArticleId
} = require("../models/articles.models");

exports.getArticles = (req, res, next) => {
  return selectArticles()
    .then((articleRows) => {
      res.status(200).send({ articles: articleRows });
    })
    .catch(next);
};

exports.getArticleById = ({ params : {article_id} }, res, next) => {
  return selectArticleById(article_id)
    .then(([article]) => {
      res.status(200).send({ article : article});
    })
    .catch(next);
};

exports.patchNewVoteByArticleId = ({body : voteObj, params : {article_id}}, res, next) => {
    return updateNewVoteByArticleId(voteObj,article_id)
    .then(({rows : [article]}) => {
      res.status(200).send({ article: article })
    })
    .catch(next);
}


