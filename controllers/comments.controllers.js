const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  dbDeleteCommentByCommentId
} = require("../models/comments.models");
const {
  checkArticleIdExists
} = require("../utils");


exports.getCommentsByArticleId = ({ params: { article_id } }, res, next) => {
    return Promise.all([
      checkArticleIdExists(article_id),
      selectCommentsByArticleId(article_id),
    ])
      .then(([article_idCheck, { rows: commentsRows }]) => {
        if (article_idCheck) {
          res.status(200).send({ comments: commentsRows });
        } else {
          return Promise.reject({
            status: 404,
            msg: "Article with that Id does not exist, nor are there any comments with a matching article Id!",
          });
        }
      })
      .catch(next);
  };
  
  exports.postCommentByArticleId = (
    { body: comment, params: { article_id } },
    res,
    next
  ) => {
    return insertCommentByArticleId(comment, article_id)
    .then(
      ({ rows: [commentPosted] }) => {
        res.status(201).send({ comment: commentPosted });
      }
    )
    .catch(next);
  };

exports.srvDeleteCommentByCommentId = ({params : {comment_id}},res,next) => {

  return dbDeleteCommentByCommentId(comment_id)
  .then(({rows : deletedCommentRow})=>{
    if(deletedCommentRow.length){
      res.status(204).send();
    }else{
      return Promise.reject({
        status: 404,
        msg: "Comment with that Id does not exist!",
      });
    }
  })
  .catch(next)
}