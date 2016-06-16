var React = require('react');
var Link = require('react-router').Link;
var NavigationComponent=require('./navigation');

var UpdateMovieComponent = React.createClass({
  componentDidMount:function(){
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
handleMovieUpdate: function(Movieid,MovieTitle,MovieActors,MovieDirector,MoviePlot,MovieReleased){
  $.ajax({
      type: 'PUT',
      url: '/api/movies/' + Movieid,
      data: { Title:MovieTitle,Actors:MovieActors,Director:MovieDirector,Plot:MoviePlot,Released:MovieReleased },
    dataType: 'json',
    success: function (data) {
    }.bind(this),
    });
},
getInitialState: function() {
 return {
    MoviesInput: []
   };
},
render: function()
{
  return(
  <div>
        <NavigationComponent />
         <UpdateMovieList  movies={this.state.MoviesInput} onMovieUpdate={this.handleMovieUpdate}  />
    </div>
  );
}
})

var UpdateMovieList = React.createClass({
  handleUpdate: function(Movieid,MovieTitle,MovieActors,MovieDirector,MoviePlot,MovieReleased){
      return this.props.onMovieUpdate(Movieid,MovieTitle,MovieActors,MovieDirector,MoviePlot,MovieReleased);
    },
    getInitialState:function()
    {
      return{
      movieTitleInput:''
    };
    },

    handleUserInput: function(filterText) {
      this.setState({
      movieTitleInput  : movieTitleInput
       });
    },
     render: function () {
    var movierows = [];
   this.props.movies.forEach(function(movie) {
     movierows.push(<UpdateMovieItem movie={movie} key={movie.imdbID} Movieid={movie._id}
       MovieTitle={movie.Title} MovieActors={movie.Actors} MovieDirector={movie.Director} MoviePlot={movie.Plot}
       MovieReleased={movie.Released}
        onUpdate={this.handleUpdate} onUserInput={this.handleUserInput} movieTitleInput={this.state.movieTitleInput} />);
   }.bind(this));
       return (
      <div>
        {movierows}
      </div>
        );
   }
});
var UpdateMovieItem = React.createClass({
  getInitialState:function()
  {
    return{
    Title:this.props.movie.Title,
    Actors:this.props.movie.Actors,
    Director:this.props.movie.Director,
    Plot:this.props.movie.Plot,
    Released:this.props.movie.Released
  };
},
  handleActorsChange:function(e)
  {
    this.setState({ Actors : e.target.value })
  },
  handleDirectorChange:function(e)
  {
    this.setState({ Director : e.target.value })
  },
  handlePlotChange:function(e)
  {
    this.setState({ Plot : e.target.value })
  },
  handleReleasedChange:function(e)
  {
    this.setState({ Released : e.target.value })
  },
  handleUpdate: function(){
      var Movieid = this.props.Movieid;
      var MovieTitle=this.state.Title;
      var MovieActors=this.state.Actors;
      var MovieDirector=this.state.Director;
      var MoviePlot=this.state.Plot;
      var MovieReleased=this.state.Released;
      return this.props.onUpdate(Movieid,MovieTitle,MovieActors,MovieDirector,MoviePlot,MovieReleased);
    },
  render: function() {
    return(
        <div className="row" id="movieThing">
          <div className="col-sm-4">
            <img src={this.props.movie.Poster} alt="image" className="img-responsive" />
          </div>
            <div className="col-sm-8">
            <form role="form">
              <div className="form-group">
                  <label>
                    Title:
                  </label>
                  <input type="text"  className="form-control" value={this.state.Title} id="movieTitle"
                  readOnly />
              </div>
              <div className="form-group">
                  <label>
                    Actors:
                  </label>
                  <input type="text"   className="form-control" value={this.state.Actors} id="movieActors"
                  onChange={this.handleActorsChange} />
              </div>
              <div className="form-group">
                  <label>
                    Director:
                  </label>
                  <input type="text"   className="form-control" value={this.state.Director} id="movieDirector"
                  onChange={this.handleDirectorChange}  />
              </div>
              <div className="form-group">
                  <label>
                    Plot:
                  </label>
                  <input type="text"   className="form-control" value={this.state.Plot} id="moviePlot"
                  onChange={this.handlePlotChange}  />
              </div>
              <div className="form-group">
                  <label>
                    Released:
                  </label>
                  <input type="text"   className="form-control" value={this.state.Released} id="movieReleased"
                  onChange={this.handleReleasedChange}  />
              </div>
              <div className="form-group">
                  <label>
                      Movie ID:
                  </label>
                  <input type="text"   className="form-control" value={this.props.movie._id} id="objectID" readOnly />
              </div><br /> <br /> <br />
              </form>
              <button className="btn btn-warning" onClick={this.handleUpdate} id="updateButton">Update Movie</button>
            </div>
        </div>
    );
  }
});
module.exports = UpdateMovieComponent;
