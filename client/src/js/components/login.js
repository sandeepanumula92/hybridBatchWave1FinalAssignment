var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var Reflux = require('reflux');

var store = require('../stores/store');
var actions = require('../actions/actions');

var LoginComponent = React.createClass({
  mixins :[
    Router.Navigation,
    Reflux.listenTo(store, 'onStoreUpdate')],
  onStoreUpdate : function(data){
    window.localStorage.setItem('user', data.user);
    window.localStorage.setItem('token', data.token);
    if(data.user != null && data.token != null){
      console.log(data.user);
      this.loginSuccess();
    }
  },
  loginSuccess(){
    this.transitionTo('/home');
  },
  doLogin : function(e){
    e.preventDefault();
    var data = $('#loginForm').serialize();
    actions.login(data);
  },
  render : function(){
    return(
      <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Welcome, Please login buddy !!!</h3>
              </div>
              <div className="panel-body">
                  <form role="form" id="loginForm">
                      <fieldset>
                          <div className="form-group">
                              <input className="form-control" placeholder="E-mail" name="email" type="email" autofocus />
                          </div>
                          <div className="form-group">
                              <input className="form-control" placeholder="Password" name="password" type="password" />
                          </div>
                          <center>
                            <button type="button"  id="loginButton" className="btn btn-success" onClick={this.doLogin} >
                            Login</button>
                            <p><br />First Time ? Then <Link to="/register">Click here to Register</Link></p>
                          </center>

                      </fieldset>
                  </form>
              </div>
            </div>
      </div>
   </div>
</div>
    );
  }
});
module.exports = LoginComponent;
