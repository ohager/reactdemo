define(function (require) {

    require('component/fluxsimulator/fluxconfig');
    var React = require('react');
    var NanoFlux = require('nanoflux');

    return React.createClass({

        visualizationStore: NanoFlux.getStore('visualizationStore'),
        visualizationActions: NanoFlux.getActions('visualizationActions'),
        _subscription: null,

        getInitialState: function () {
            return { noDispatches : 0, lastDispatchedAction : {}}
        },

        onActionTriggered: function (action) {
            if (this.isMounted()) {
                var state = this.state;
                state.noDispatches++;
                state.lastDispatchedAction = {
                    actionName : action.name,
                    actionData: action.payload
                };
                this.setState(state);
            }
        },

        componentWillMount: function () {
            this.visualizationStore.subscribe(this, this.onActionTriggered);
        },

        componentDidMount: function () {
        },

        componentWillUnmount: function () {
            if (this._subscription) {
                this._subscription.unsubscribe();
            }
        },

        render: function () {

            return (
                React.createElement("div", {className: "panel panel-default"}, 
                    React.createElement("div", {className: "panel-heading"}, 
                        React.createElement("h3", {className: "panel-title"}, "Dispatcher View")
                    ), 
                    React.createElement("div", {className: "panel-body"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-lg-6"}, 
                                React.createElement("small", null, "No. Dispatches")
                            ), 
                            React.createElement("div", {className: "col-lg-6"}, 
                                React.createElement("small", null, "Last Dispatched Action")
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-lg-6 vcenter text-center"}, 
                                React.createElement("h2", null, this.state.noDispatches)
                            ), 
                            React.createElement("div", {className: "col-lg-6 vcenter"}, 
                                React.createElement("pre", null, JSON.stringify(this.state.lastDispatchedAction, null , 2))
                            )
                        )
                    )
                )
            )
        }
    })
});
