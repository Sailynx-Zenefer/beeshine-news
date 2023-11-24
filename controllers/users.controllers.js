const {
    selectUsers
  } = require("../models/users.models");
  
  exports.getUsers = (req, res, next) => {
    return selectUsers()
      .then(({ rows : userRows }) => {
        res.status(200).send({ users: userRows });
      })
      .catch(next);
  };
  