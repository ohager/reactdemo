define(function (require) {

    require('component/fluxsimulator/fluxconfig');
    var React = require('react');
    var NanoFlux = require('nanoflux');

    var UserItem = React.createClass({displayName: "UserItem",

        propTypes: {
            user: React.PropTypes.shape({
                id: React.PropTypes.number,
                name: React.PropTypes.string,
                firstName: React.PropTypes.string,
                lastName: React.PropTypes.string
            }).isRequired,
            onClick : React.PropTypes.func,
            onRemove : React.PropTypes.func
        },

        render: function () {
            return (
                React.createElement("li", {className: "list-group-item", onClick: this.props.onClick.bind(null,this.props.user.id)}, 
                        React.createElement("span", {className: "glyphicon glyphicon-remove-circle pull-right", "aria-hidden": "true", 
                              onClick: this.props.onRemove.bind(null,this.props.user.id)}), 
                    React.createElement("h4", {className: "list-group-item-heading"}, this.props.user.name)
                )
            );
        }
    });

    return React.createClass({

        userStore: NanoFlux.getStore('userStore'),
        visualizationActions : NanoFlux.getActions('userActions'),

        getInitialState: function () {
            return {text: '', userItems: this.userStore.getUserList()}
        },

        onUsersChanged: function (userList) {
            if(this.isMounted()) {
                this.setState({userItems: userList});
            }
        },

        componentWillMount: function () {
            this.userStore.subscribe(this, this.onUsersChanged);
        },

        componentDidMount: function () {
        },

        addItem: function (event) {
        },

        removeItem: function (id) {
        },

        selectItem : function(userId){
            this.visualizationActions.selectUser(userId);
        },

        render: function () {

            return (
                React.createElement("div", {className: "panel panel-default"}, 
                    React.createElement("div", {className: "panel-heading"}, 
                        React.createElement("h3", {className: "panel-title"}, "Users")
                    ), 
                    React.createElement("div", {className: "panel-body"}, 
                        React.createElement("ul", {ref: "list", className: "list-group"}, 
                            
                                this.state.userItems.map(function(userItem, index){
                                    return React.createElement(UserItem, {key: index, user: userItem, onClick: this.selectItem, 
                                                     onRemove: this.removeItem})
                                    }.bind(this))
                                
                        )
                    )
                )
            )
        }
    })
});
