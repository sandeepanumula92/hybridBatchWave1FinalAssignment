var React = require('react');
var Link = require('react-router').Link;
var NavigationComponent = require('./navigation');


var HomeComponent = React.createClass({
  getInitialState : function() {
   return {
     user : window.localStorage.getItem('user')
     };
 },
  render:function()
  {
    return(
      <div className="container">
              <NavigationComponent />
        <div className="row" id="homeBox">
      		<div className="col-md-12">
      			<div className="jumbotron">
      				<h2>
      					Welcome {this.state.user} !
      				</h2>
      				<p>
      					This is my Movie Blog.....
      				</p>
            </div>
      		</div>
      	</div>
      </div>
      );
  }
});
module.exports = HomeComponent;
