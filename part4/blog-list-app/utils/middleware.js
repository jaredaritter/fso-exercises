const logger = require('./logger');

// CHANGES PASSWORD TO PREVENT BEING SHOW IN LOGS
const sanitizer = (body) => {
  if (body.password) {
    body.password = 'nottherealpassword';
  }
  return body;
};

const requestLogger = (request, response, next) => {
  const bodyCopy = { ...request.body };
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', sanitizer(bodyCopy));
  logger.info('---');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }

  logger.error(error.message);

  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
