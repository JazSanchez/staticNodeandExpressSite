//Variables required
const express = require('express');
const { projects} = require("../data/data.json")
const app = express();

//Middleware
app.set('view engine', 'pug');
app.use("/static", express.static("public"))


//Routes
app.get('/', (req, res) => {
    res.render('index', {projects});
});

app.get('/about', (req, res)=>{
  res.render('about')

})

app.get('/projects/:id', (req, res, next) => {
  let projectId = req.params.id;
  let project = projects.find(({id}) => id === projectId)
      res.render('project', {project})
 });

//Erros handlers
app.use((req, res, next) =>{
   console.log('404 error handler called')
   res.status(404).render('not-found');
})

app.use((err, req, res, next)=> {

    if(err.status === 404){
        res.status(404).render('not-found', {err});
    }else{
      err.message = err.message || `Oops! It looks like something went wrong on the server`  
      res.status(err.status || 500).render('error', {err})}})


 module.exports = app;


