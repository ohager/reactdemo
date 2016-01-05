define(function (require) {

    require('component/fluxsimulator/fluxconfig');
    var React = require('react');
    var NanoFlux = require('nanoflux');

    return React.createClass({

        visualizationStore: NanoFlux.getStore('simulationStore'),
        userActions : NanoFlux.getActions('userActions'),

        getInitialState: function () {
            return {actionName: ''}
        },

        onActionTriggered: function (action) {
            this.setState({actionName : action.name})
        },

        componentWillMount: function () {
            this.visualizationStore.subscribe(this, this.onUsersChanged);
        },

        componentDidMount: function () {
        },

        addItem: function (event) {
        },

        removeItem: function (id) {
        },

        selectItem : function(userId){
            this.userActions.selectUser(userId);
        },

        render: function () {

            return (
                React.createElement("div", {className: "action-indicator"}, 
                    React.createElement("small", null, this.state.actionName)
                )
            )
        }
    })
});
