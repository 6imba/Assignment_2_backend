// Not found
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.method} ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
// Error handling
const errorHandler = (error, _req, res, next) => {
  // const statusCode = res.statusCode === 200_range ? 500 : res.statusCode;
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.log('status', statusCode)
    res.status(statusCode);
    res.json({
      success: false,
      message: error.message,
      error: process.env.NODE_ENV === `production` ? `🥞` : error.stack,
    });
    next();
  };

export { notFound, errorHandler }
