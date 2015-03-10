define(['react', 'restservice/auth.service', 'common/auth', 'common/route'], function (React, AuthService, $auth, $route) {


        var InputField = React.createClass({
            render: function () {
                return (
                    <input type={this.props.type} id={this.props.id} className="form-control input-sm chat-input" placeholder={this.props.placeholder} onChange={this.props.onChange} />
                );
            }
        });

        var credentials = { };

        return {

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
                    <form id="login">
                        <small>&nbsp;{this.state.login}</small>
                        <InputField id="username" type="text" placeholder="usuário" onChange={this.update}></InputField>
                        <br/>
                        <InputField id="password" type="password" placeholder="senha" onChange={this.update}></InputField>
                        <br/>
                        <div className="wrapper">
                            <span className="group-btn">
                                <a href="#" className="btn btn-primary btn-md" onClick={this.login}>Entrar&nbsp;
                                    <i className="glyphicon glyphicon-off"></i>
                                </a>
                            </span>
                        </div>
                    </form>
                );
            }
        };
    }
);