// Error handling
const errorHandler = (error, req, res, next) => {
  res.send({success:false,message:error.message})
  console.log(error.message)
  console.log("---------------------------------------------")
  next()

};

export { errorHandler }
