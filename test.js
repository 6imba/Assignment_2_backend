// const variable = new Error()
// console.log(typeof(variable))
// console.log( variable instanceof Error )
// console.log("-----------------------------------------------------------------------------------")
// console.log( variable)
// console.log("-----------------------------------------------------------------------------------")

// ..........................................................................................................................

import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log("1................");
  next();
});
app.use((req, res, next) => {
  console.log("2................");
  // res.send("<h1>Hi</h1>")
  // res.json("2")
  // res.render(demo_template)
  // res.end()
//   res.end("ok");
  next();
});
app.use((req, res, next) => {
  console.log("3................");
  next();
});

// app.use('/', (req,res,next) => {
app.get("/", (req, res, next) => {
  console.log("index");
  next();
});
// app.use('/about', (req,res,next) => {
app.get("/about", (req, res, next) => {
  console.log("about");
//   next(new Error('x'));
next()
});

app.use((req, res, next) => {
  console.log("4");
//   next();
  next('apple')
  // next('ape','cat')
//   try {
//     throw "my custom error";
//   } catch (err) {
//     next(err);
//   }
});

app.use((err, req, res, next) => {
  console.log(err);
  console.log(
    "Error handling ..............................................................................."
  );
//   next();
});

// app.use((para_1,para_2,req,res,next) => {
//     console.log("Error handling .........................")
//     console.log(para_1,para_2,'-----------------------------')
//     next()
// });

app.listen(8012, (req, res) => {
  console.log("Express start at http://localhost:8012");
});

// ..........................................................................................................................
