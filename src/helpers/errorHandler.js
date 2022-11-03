// Not found
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.method} ${req.originalUrl}`);
    res.status(404);
    next(error);
  };

// Error handling
const errorHandler = (error, req, res, next) => {
  // const statusCode = res.statusCode === 200_range ? 500 : res.statusCode;
  // const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // res.status(res.statusCode);
  res.json({
    success: false,
    message: error.message,
    // error: process.env.NODE_ENV === `production` ? `🥞` : err.stack,
  });
  next();
};

// export { errorHandler }
export { notFound, errorHandler }
