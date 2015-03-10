define(['react','component/login.form'], function(React, $loginForm){
    var loginForm = React.createClass($loginForm);
    var element = React.createElement(loginForm, null);
    React.render( element, document.getElementById('login-form'));
});