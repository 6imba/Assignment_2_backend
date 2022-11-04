// Not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error handling
const errorHandler = (error, req, res, next) => {
  res.send({success:false,message:error.message})
  console.log(error.message)
  console.log("---------------------------------------------")
  next()

};

export { notFound, errorHandler }