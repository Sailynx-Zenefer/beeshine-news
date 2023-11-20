const {
  selectTopics
} = require("../models/topics.models");

const endpoints =  require("../endpoints")

exports.getEndpoints = (req,res,next) => {
  res.status(200).send({endpoints : endpoints})
  .catch(next)
}

exports.getTopics = (req, res, next) => {
  return selectTopics()
    .then(({ rows : topicRows }) => {
      res.status(200).send({ topics: topicRows });
    })
    .catch(next);
};

const handleEndpoint404Errs = (req, res, next) => {
  return Promise.reject({status: 404, msg : "Not Found"})
}

exports.catchAll = (req, res, next) => {
  handleEndpoint404Errs()
  .catch(next)
}

