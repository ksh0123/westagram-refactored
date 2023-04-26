const jwt = require('jsonwebtoken');

const { catchAsync } = require('../utils/error');

const validateToken = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const err = new Error('No Access Token');
    err.code = 400;
    throw err;
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.user = decoded.userId;

  return next();
});

module.exports = {
  validateToken,
};