define(function (require) {

    require('component/fluxsimulator/fluxconfig');

    var UserList = require('component/fluxsimulator/userlist');
    var UserDetail = require('component/fluxsimulator/userdetail');
    var ActionIndicator = require('component/fluxsimulator/action.indicator');
    var DispatcherViewer = require('component/fluxsimulator/dispatcher.viewer');
    var UserStoreViewer = require('component/fluxsimulator/user.store.viewer');

    var React = require('react');
    var NanoFlux = require('nanoflux');

          return React.createClass({

            CanvasUrl : window.Global.githubSourcePath + '/fluxsimulator.canvas.js',

            getInitialState: function () {
                return {};
            },

            componentWillMount: function(){
            },

            componentDidMount : function(){
            },

            render: function () {

                return (
                    <div>
                        <ActionIndicator/>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12">
                                <h2>Flux Simulator</h2>
                                <p>This example visualizes the Data Flow in a Flux Architecture.</p>
                                <a href={this.CanvasUrl} target="_blank">Code</a>
                                <hr/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <DispatcherViewer/>
                            </div>
                            <div className="col-xs-6 col-sm-6">
                                <UserStoreViewer/>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <UserList/>
                            </div>
                            <div className="col-xs-6 col-sm-6">
                                <UserDetail/>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    });
