var express = require('express');
var router = express.Router();
var request = require("sync-request");
var movieModel = require('../models/movies.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET movie List. */
router.get('/new-movies', async function(req, res, next) {
  var requete = request("GET", "https://api.themoviedb.org/3/movie/popular?api_key=9be86a79a83f11f0dc68bcbb8aa08a73&language=fr-FR");
  var newMovieList = JSON.parse(requete.body)
  console.log(newMovieList.results)

  res.json('index',{newMovieList})
})


/* GET wish List. */
router.post('/wishList-movie', async function(req, res, next){

  var newMovie = new movieModel ({
    title: req.body.title,
    img: req.body.img,
  })
  var movieSaved = await newMovie.save()
  if (movieSaved) {
    console.log('Data imput to BD Success!')
  }
  // movieList = await movieModel.find();

  res.json({results:true})
})


/* Delete wish List. */
router.delete('/wishList-movie/:title', async function(req, res, next){
  await movieModel.deleteOne({title: req.params.title})
  console.log("delete")
  res.json({results:true});
});


let wishList = []
/* Afficher wish List. */
router.get('/WISHLIST-MOVIE', async function(req, res, next){
  wishList = await movieModel.find()
  console.log(wishList)
  res.json({results:true});
});

module.exports = router;
