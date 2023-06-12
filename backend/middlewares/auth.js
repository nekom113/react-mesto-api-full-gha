const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/error_types/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { UNAUTHORIZED_ERROR_CODE } = require('../utils/status_codes');

const authToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(
      new UnauthorizedError(UNAUTHORIZED_ERROR_CODE.messages.authorizationError),
    );
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(
      new UnauthorizedError(UNAUTHORIZED_ERROR_CODE.messages.authorizationError),
    );
  }

  req.user = payload;
  return next();
};
module.exports = { authToken };
