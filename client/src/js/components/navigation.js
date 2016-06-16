var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var Reflux = require('reflux');

var store = require('../stores/store');
var actions = require('../actions/actions');

var NavigationComponent = React.createClass({
  mixins: [Router.Navigation,Reflux.listenTo(store,'onstorechange')],
  doLogout : function(){
    console.log("inside Do Logout ");
    actions.logout();
  },
  onstorechange:function(){
    this.transitionTo("/login");
  },
  render:function()
  {
    return(
      <div className="navbar navbar-fixed-top">
               <div className="container">
                   <button className="navbar-toggle" data-target=".navbar-responsive-collapse" data-toggle="collapse" type="button">
                       <span className="icon-bar"></span>
                       <span className="icon-bar"></span>
                       <span className="icon-bar"></span>
                   </button>
                   <div className="nav-collapse collapse navbar-responsive-collapse">
                       <ul className="nav navbar-nav navbar-left">
                           <li className=""><Link to="/home">Home</Link></li>
                           <li className=""><Link to="/allmovies">My Movies</Link></li>
                           <li className=""><Link to="/movies">Search And Add Movies</Link></li>
                           <li className=""><Link to="/addmovie">Custom Add Movies</Link></li>
                           <li className=""><Link to="/update">Update Movies</Link></li>
                            <li><a onClick={this.doLogout} >Logout</a></li>
                       </ul>
                   </div>
               </div>
           </div>
        );
      }
});
module.exports = NavigationComponent;
