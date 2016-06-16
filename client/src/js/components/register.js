var React = require('react');
var Link = require('react-router').Link;
var Reflux=require('reflux');

var store = require('../stores/store');
var actions = require('../actions/actions');

var RegisterComponent = React.createClass({
  mixins : [Reflux.listenTo(store, 'onStoreUpdate')],
  onStoreUpdate : function(){
    this.clear();
  },
  clear : function(){
    $('#registerForm')[0].reset();
  },
  doRegister : function(e){
    e.preventDefault();
    var data = $('#registerForm').serialize();
    actions.register(data);
  },
  render : function(){
    return(
      <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Welcome, Please register buddy !!!</h3>
              </div>
              <div className="panel-body">
                  <form role="form" id="registerForm">
                      <fieldset>
                        <div className="form-group">
                      <input type="text" className="form-control" name="name" id="name"  placeholder="Enter your Name"/>
                        </div>
                          <div className="form-group">
                              <input className="form-control" placeholder="E-mail" name="email" type="email" autofocus />
                          </div>
                          <div className="form-group">
                              <input className="form-control" placeholder="Password" name="password" type="password" />
                          </div>
                          <center>
                          <button type="button" className="btn btn-success" id="registerButton"
                          onClick={this.doRegister} >Register</button>
                            <p><br /><Link to="/">Login Here</Link></p>
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
module.exports = RegisterComponent;
