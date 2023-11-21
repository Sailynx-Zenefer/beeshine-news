exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlErrs = {
    "22P02": [400, "Bad Request: Invalid Input"],
  };

  if (psqlErrs[err.code]) {
    res.status(psqlErrs[err.code][0]).send({ msg: psqlErrs[err.code][1] });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
};



