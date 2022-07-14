//Variables required
const express = require("express");
const { render } = require("express/lib/response");
const { projects } = require("./data.json");
const app = express();

//Middleware
app.set("view engine", "pug");
app.use("/static", express.static("public"));

app.listen(3000, () => {
  console.log("The application is listening on localhost 3000!");
});

//Routes
app.get("/", (req, res, next) => {
  res.render("index", { projects });
});

app.get("/about", (req, res, next) => {
  res.render("about");
});

app.get("/projects/:id", (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  if (project) {
    res.render("project", { project });
  } else {
    //  res.sendStatus(404);
    console.log("error 404");
  }
});

//Erros handlers
app.use((req, res, next) => {
  const err = new Error("not-found");
  err.status = 404;
  err.message = "404 error handler has been called";
  next(err);
});

app.use((err, req, res) => {
  if (err) {
    console.log("Global error handler called", err);
  }
  if (err.status === 404) {
    res.status = 404;
    render("not-found", { err });
  } else {
    err.message = err.message || "Oops! There seems to be an error with the server";
    res.status(err.status || 500).render('error', {err})
   
  }});
