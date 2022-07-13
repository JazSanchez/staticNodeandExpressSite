//Variables required
const express = require("express");
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
  res.locals.projects = projects;
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
  const err = new Error("404 error handler called");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.render("not-found", { err });
  } else {
    err.message =
      err.message || "Oops! It looks like something went wrong on the server.";
    res.status(err.status || 500).render("error", { err });
  }
});
