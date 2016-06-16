var React = require('react');
var Link = require('react-router').Link;
var NavigationComponent=require('./navigation');

var MainLayoutComponent=React.createClass({
  render:function()
  {
    return(
    <div className="container" id="main">
      <NavigationComponent />
      <main>
        {this.props.children}
      </main>
    </div>
  );
  }
});
module.exports = MainLayoutComponent;
