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
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Dispatcher View</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <small>No. Dispatches</small>
                            </div>
                            <div className="col-lg-6">
                                <small>Last Dispatched Action</small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 vcenter text-center">
                                <h2>{this.state.noDispatches}</h2>
                            </div>
                            <div className="col-lg-6 vcenter">
                                <pre>{JSON.stringify(this.state.lastDispatchedAction, null , 2)}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    })
});
