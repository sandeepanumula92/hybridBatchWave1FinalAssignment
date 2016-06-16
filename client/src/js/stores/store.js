var Reflux=require('reflux');
var actions = require('../actions/actions');

var store = Reflux.createStore({
listenables : actions,
data : {
  user : null,
  token : null
},
onRegister : function(data){
  $.ajax({
    type : 'POST',
    url : 'api/user/register',
    data : data,
    dataType : 'JSON',
    cache : false,
    error : function(err){
      console.log(err);
    }.bind(this),
    success : function(response){
      console.log(response);
      if(response.success==false && response.message=='User already registered')
      {
        alert('User already exists');
        this.data.user = null;
        this.data.token = null;
      }
      if(response.success==true && response.message=='inserted')
      {
        alert('User Registered.. Please login again');
        this.data.user = null;
        this.data.token = null;
      }
      this.trigger(this.data);
    }.bind(this)
  });
},
onLogin : function(data){
  $.ajax({
    type : 'POST',
    url : 'api/user/login',
    data : data,
    dataType : 'JSON',
    cache : false,
    error : function(err){
      console.log(err);
    }.bind(this),
    success : function(response){
      if(response && response.success === false){
        console.log(response.message);
        this.data.user = null;
        this.data.token = null;
      } else if(response && response.hasOwnProperty('token')){
          this.data.user = response.user;
          this.data.token = response.token;
      }
      this.trigger(this.data);
    }.bind(this)
  });
},
onLogout : function(){
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      this.trigger();
}
});
module.exports = store;
