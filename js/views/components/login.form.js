define(function(require){

        var React = require('react');
        var AuthService = require('restservice/auth.service');
        var $auth = require('common/auth');
        var $route = require('common/route');

        var credentials = { };

        return React.createClass({

            getInitialState: function () {
                return {login : ''};
            },

            componentDidMount: function(){
                document.getElementById('username').focus();
            },

            update : function(event){
                credentials[event.target.id] =  event.target.value ;
                this.setState( {login : ''} );
            },

            login: function (event) {
                var authService = new AuthService();
                var that = this;
                authService.login(credentials.username, credentials.password).then(function (token) {
                    $auth.setAuthToken(token);
                    $route.gotoStartPage();
                }).catch(function () {
                    that.setState( {login : "Login failed"} );
                })
            },

            render: function () {
                return (
                    React.createElement("form", {id: "login"}, 
                        React.createElement("small", null, " ", this.state.login), 
                        React.createElement("input", {id: "username", type: "text", placeholder: "username", onChange: this.update}), 
                        React.createElement("br", null), 
                        React.createElement("input", {id: "password", type: "password", placeholder: "password", onChange: this.update}), 
                        React.createElement("br", null), 
                        React.createElement("div", {className: "wrapper"}, 
                            React.createElement("span", {className: "group-btn"}, 
                                React.createElement("a", {href: "#", className: "btn btn-primary btn-md", onClick: this.login}, "Login ", 
                                    React.createElement("i", {className: "glyphicon glyphicon-off"})
                                )
                            )
                        )
                    )
                );
            }
        });
    }
);