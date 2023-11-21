const {
  selectTopics
} = require("../models/topics.models");

exports.getTopics = (req, res, next) => {
  return selectTopics()
    .then(({ rows : topicRows }) => {
      res.status(200).send({ topics: topicRows });
    })
    .catch(next);
};
