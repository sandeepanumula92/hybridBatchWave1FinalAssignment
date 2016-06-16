var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var Home=require('./components/home');
var Movie=require('./components/moviebox');
var AddMovie=require('./components/addmovie');
var UpdateMovie=require('./components/updatemovie');
var Login=require('./components/login');
var Register = require('./components/register');
var AllMovies = require('./components/allmovies');

module.exports = (
  <Route>
      <Route path="/" handler={Login} />
      <Route path="/register" handler={Register} />
      <Route path="/login" handler={Login} />
      <Route path="/home" handler={Home} />
      <Route path="/movies" handler={Movie} />
      <Route path="/addmovie" handler={AddMovie} />
      <Route path="/update" handler={UpdateMovie} />
      <Route path="/allmovies" handler={AllMovies} />
    </Route>
);
