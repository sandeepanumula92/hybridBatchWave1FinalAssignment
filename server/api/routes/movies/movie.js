var express = require('express');
var router = express.Router();

var imdbObj = require('node-movie');
var Movie = require('../../../models/movies/movie');

router.route("/movies/add")
  .post(function(req,res)
{
  console.log("Inside add");
  var obj={};
  var movie=new Movie();
  movie.Title=req.body.Title;
  movie.Year=req.body.Year;
  movie.Director=req.body.Director;
  movie.Rated = ' ';
  movie.Released = req.body.Released;
  movie.Runtime = ' ';
  movie.Genre = ' ';
  movie.Writer = ' ';
  movie.Actors = req.body.Actors;
  movie.Plot =req.body.Plot;
  movie.Language = ' ';
  movie.Country = ' ';
  movie.Awards = ' ';
  movie.Poster = req.body.Poster;
  movie.Metascore = ' ';
  movie.imdbRating = ' ';
  movie.imdbVotes =' ';
  movie.imdbID = req.body.someid;
  movie.Type = ' ';
  movie.Response = ' ';

  movie.save(function(err)
  {
   if(err)
   {
     return err;
   }
   else
   {
     console.log("Saved");
   }
  });

});


// Route to get all movies and save a movie
router.route('/movies')
// Get all movies
    .get(function(req, res){

      Movie.find(function(err, movies) {
            if (err)
                res.send(err);
            res.json(movies);
        });
    })
//My own router

// Search and save the movie
  .post(function(req, res) {

        imdbObj(req.body.Title, function (err, data) {
        if (data){
        var movie = new Movie();
        movie.Title = data.Title;
        movie.Year =  data.Year;
        movie.Rated = data.Rated;
        movie.Released = data.Released;
        movie.Runtime = data.Runtime;
        movie.Genre = data.Genre;
        movie.Director = data.Director;
        movie.Writer = data.Writer;
        movie.Actors = data.Actors;
        movie.Plot = data.Plot;
        movie.Language = data.Language;
        movie.Country = data.Country;
        movie.Awards = data.Awards;
        movie.Poster = data.Poster;
        movie.Metascore = data.Metascore;
        movie.imdbRating = data.imdbRating;
        movie.imdbVotes = data.imdbVotes;
        movie.imdbID = data.imdbID;
        movie.Type = data.Type;
        movie.Response = data.Response;
        movie.save(function(err) {
            if (err)
                res.send(err);
            res.json('{Movie Added}');
              });
            }else {
              res.send(err);
            }
            });
        });

// Route to get all movies and save a movie
    router.route('/movies/:movie_id')
// Get the movie by id
          .get(function(req, res) {
            Movie.findById(req.params.movie_id, function(err, movie) {
                if (err)
                    res.send(err);
                res.json(movie);
            });
        })
// Update the movie by id
        .put(function(req, res) {
          console.log(req.body.Title);
           var  movieTitle=req.body.Title;
          var  movieActors=req.body.Actors;
          var  movieDirector=req.body.Director;
          var  moviePlot=req.body.Plot;
          var  movieReleased=req.body.Released;
          var poster=req.body.Poster;
            Movie.where({_id:req.params.movie_id}).update({$set : {Title:movieTitle, Actors:movieActors,Director:
                movieDirector,Plot:moviePlot,Released:movieReleased,Poster:poster}},function(err)
                {
                    if(err) throw err;
                });

                res.json({ message: 'Movie updated!' });
            })
// Delete the movie by id
    .delete(function(req, res) {
        Movie.remove({
            _id: req.params.movie_id
        }, function(err, movie) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports= router;
