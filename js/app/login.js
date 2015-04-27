define( function(require){
    var React = require('react');
    var LoginForm = require('component/login.form');
    var element = React.createElement(LoginForm, null);
    React.render( element, document.getElementById('login-form'));
});