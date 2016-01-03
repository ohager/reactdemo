define(function (require) {

    require('component/fluxsimulator/fluxconfig');

    var React = require('react');
    var NanoFlux = require('nanoflux');

    var UserDetailItem = React.createClass({

        propTypes: {
            name: React.PropTypes.string.isRequired,
            value: React.PropTypes.any.isRequired,
            editable : React.PropTypes.bool,
            onChange : React.PropTypes.func
        },

        getInitialState : function(){
            return { editorOpened : false }
        },

        onEdit : function(){
            this.setState({editorOpened: true});
        },

        onChange : function(e){
            this.props.onChange(e);
        },

        onKeypress : function(e){
            if(e.key === 'Enter'){
                this.setState({editorOpened:false});
            }
        },

        renderValueEditor : function()
        {
            var isEditable = this.props.editable !== undefined ? this.props.editable : true;
            return this.state.editorOpened ?
                    <input ref="editor" type="text" value={this.props.value} onKeyPress={this.onKeypress} onChange={this.onChange}/>
                  : <span>
                        <strong>{this.props.value}</strong>
                        {isEditable ? <span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEdit}/> : null }
                    </span>
        },

        render: function () {

            return (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-lg-12">
                            <small>{this.props.name}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            { this.renderValueEditor() }
                        </div>
                    </div>
                </li>
            );
        }
    });

    return React.createClass({

        userActions : NanoFlux.getActions('userActions'),

        getInitialState: function () {
            return {selectedUser: null}
        },

        componentWillMount: function () {

        },

        componentDidMount: function () {
            NanoFlux.getStore('userStore').subscribe(this, this.onSelectedUser);
        },

        componentWillUnmount: function () {
        },

        onSelectedUser : function(users, selectedUser){
            if(this.isMounted()) {
                this.setState({selectedUser: selectedUser});
            }
        },
        onUserChange : function(property, event){
            var user = this.state.selectedUser;
            user[property] = event.target.value;
            this.userActions.updateUser(user);
        },

        mountDetailList: function () {
            return (
                !this.state.selectedUser ?
                    <ul ref="list" className="list-group">
                        <UserDetailItem name="" value="Please select a user" editable={false}/>
                    </ul>
                        :
                    <ul ref="list" className="list-group">
                        <UserDetailItem name="Username" value={this.state.selectedUser.name} onChange={this.onUserChange.bind(null, 'name')}/>
                        <UserDetailItem name="First Name" value={this.state.selectedUser.firstName} onChange={this.onUserChange.bind(null, 'firstName')}/>
                        <UserDetailItem name="Last Name" value={this.state.selectedUser.lastName} onChange={this.onUserChange.bind(null, 'lastName')}/>
                    </ul>
            );
        },

        render: function () {

            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">User Detail</h3>
                    </div>
                    <div className="panel-body">

                        {this.mountDetailList()}

                    </div>
                </div>
            )
        }
    })
});
