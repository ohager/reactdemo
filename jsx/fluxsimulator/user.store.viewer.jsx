define(function (require) {

    require('component/fluxsimulator/fluxconfig');
    var React = require('react');
    var NanoFlux = require('nanoflux');

    return React.createClass({

        visualizationStore: NanoFlux.getStore('visualizationStore'),
        userStore: NanoFlux.getStore('userStore'),
        visualizationActions: NanoFlux.getActions('visualizationActions'),
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
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">User Store View</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <small>No. Users</small>
                            </div>
                            <div className="col-lg-6">
                                <small>Last Method Call</small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 vcenter text-center">
                                <h2>{this.state.noUsers}</h2>
                            </div>
                            <div className="col-lg-6 vcenter">
                                <pre>{this.state.lastMethodCall}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    })
});
