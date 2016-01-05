define(function (require) {

    require('component/fluxsimulator/fluxconfig');
    var React = require('react');
    var NanoFlux = require('nanoflux');

    return React.createClass({

        visualizationStore: NanoFlux.getStore('visualizationStore'),
        userStore: NanoFlux.getStore('userStore'),
        userActions: NanoFlux.getActions('visualizationActions'),
        _subscription: null,


        getInitialState: function () {
            return { noUsers : 0, lastMethodCall: ''}
        },

        onActionTriggered: function (action) {
            if (this.isMounted()) {
                var state = this.state;
                state.noUsers = this.userStore.getUserList().length;
                state.lastMethodCall = action.storeName;
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
                        React.createElement("h3", {className: "panel-title"}, "User Store View")
                    ), 
                    React.createElement("div", {className: "panel-body"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-lg-6"}, 
                                React.createElement("small", null, "No. Users")
                            ), 
                            React.createElement("div", {className: "col-lg-6"}, 
                                React.createElement("small", null, "Last Method Call")
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-lg-6 vcenter text-center"}, 
                                React.createElement("h2", null, this.state.noUsers)
                            ), 
                            React.createElement("div", {className: "col-lg-6 vcenter"}, 
                                React.createElement("pre", null, this.state.lastMethodCall)
                            )
                        )
                    )
                )
            )
        }
    })
});
