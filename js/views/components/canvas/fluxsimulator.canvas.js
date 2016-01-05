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
                    React.createElement("div", null, 
                        React.createElement(ActionIndicator, null), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-12 col-sm-12"}, 
                                React.createElement("h2", null, "Flux Simulator"), 
                                React.createElement("p", null, "This example visualizes the Data Flow in a Flux Architecture."), 
                                React.createElement("a", {href: this.CanvasUrl, target: "_blank"}, "Code"), 
                                React.createElement("hr", null)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement(DispatcherViewer, null)
                            ), 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement(UserStoreViewer, null)
                            )
                        ), 
                        React.createElement("hr", null), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement(UserList, null)
                            ), 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement(UserDetail, null)
                            )
                        )
                    )
                )
            }
        })
    });
