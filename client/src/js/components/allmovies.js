var React = require('react');
var Link = require('react-router').Link;
var NavigationComponent=require('./navigation');

var MovieList = React.createClass({
  handleDelete: function(Movieid){
      return this.props.onMovieDelete(Movieid);
    },
  render : function(){
    var movierows = [];
    this.props.movies.forEach(function(movie){
      movierows.push(<MovieItem movie={movie} key={movie.imdbID} Movieid={movie._id} onDelete = {this.handleDelete} />);
    }.bind(this));
    return(
      <div>{movierows}</div>
    );
  }
});

var MovieItem = React.createClass({
handleClick : function(){
  var Movieid = this.props.Movieid;
  return this.props.onDelete(Movieid);
},
  render : function(){
    return(
      <div className="row" id="movieThing">
          <div className="col-sm-4">
            <img src={this.props.movie.Poster} alt="image" className="img-responsive" id="imagePoster"/>
          </div>
            <div className="col-sm-8">
              <h3 id="movieTitle">Title: {this.props.movie.Title}</h3>
              <p>Actors: {this.props.movie.Actors}</p>
              <p>Director: {this.props.movie.Director}</p>
              <p>Plot: {this.props.movie.Plot} </p>
              <p>Released: {this.props.movie.Released}</p>
              <p> Imdb ID: {this.props.movie.imdbID}</p>
            </div>
        </div>
    );
  }
});

var AllMovies = React.createClass({
    loadMovie:function(){
    $.ajax({
      type:'GET',
      url: '/api/movies',
      datatype:'json',
      success: function(data) {
          this.setState({
            MoviesInput:data
          });
        }.bind(this)
    });
  },
    componentDidMount: function() {
        this.loadMovie();
       setInterval(this.loadMovie,1000);
  },
  getInitialState: function() {
   return {
     filterText: '',
      MoviesInput: []
     };
  },
  handleUserInput: function(filterText) {
    this.setState({
      filterText: filterText
     });
  },
  render: function()
  {
  return(
    <div className="container">
      <NavigationComponent />
      <MovieList filterText={this.state.filterText} movies={this.state.MoviesInput} onMovieDelete={this.handleMovieDelete}  />
      </div>
    );
  }
});
module.exports = AllMovies;
