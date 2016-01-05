define(function (require) {

    require('component/fluxsimulator/fluxconfig');

    var React = require('react');
    var NanoFlux = require('nanoflux');

    var UserDetailItem = React.createClass({displayName: "UserDetailItem",

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
                    React.createElement("input", {ref: "editor", type: "text", value: this.props.value, onKeyPress: this.onKeypress, onChange: this.onChange})
                  : React.createElement("span", null, 
                        React.createElement("strong", null, this.props.value), 
                        isEditable ? React.createElement("span", {className: "glyphicon glyphicon-pencil", "aria-hidden": "true", onClick: this.onEdit}) : null
                    )
        },

        render: function () {

            return (
                React.createElement("li", {className: "list-group-item"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-lg-12"}, 
                            React.createElement("small", null, this.props.name)
                        )
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-lg-12"}, 
                             this.renderValueEditor() 
                        )
                    )
                )
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
                    React.createElement("ul", {ref: "list", className: "list-group"}, 
                        React.createElement(UserDetailItem, {name: "", value: "Please select a user", editable: false})
                    )
                        :
                    React.createElement("ul", {ref: "list", className: "list-group"}, 
                        React.createElement(UserDetailItem, {name: "Username", value: this.state.selectedUser.name, onChange: this.onUserChange.bind(null, 'name')}), 
                        React.createElement(UserDetailItem, {name: "First Name", value: this.state.selectedUser.firstName, onChange: this.onUserChange.bind(null, 'firstName')}), 
                        React.createElement(UserDetailItem, {name: "Last Name", value: this.state.selectedUser.lastName, onChange: this.onUserChange.bind(null, 'lastName')})
                    )
            );
        },

        render: function () {

            return (
                React.createElement("div", {className: "panel panel-default"}, 
                    React.createElement("div", {className: "panel-heading"}, 
                        React.createElement("h3", {className: "panel-title"}, "User Detail")
                    ), 
                    React.createElement("div", {className: "panel-body"}, 

                        this.mountDetailList()

                    )
                )
            )
        }
    })
});
