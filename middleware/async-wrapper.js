const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      //calling another middleware for error handling
      next(error);
    }
  };
};

module.exports = asyncWrapper;
