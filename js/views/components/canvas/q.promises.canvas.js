define(function(require){

    var React = require('react');
    var Q = require('q');
    var MessageHandler = require('common/messagehandler');

        return React.createClass({

            getInitialState: function () {
                return {operationResultA: 'Pending...', operationResultB: 'Pending...', operationProgress: 0};
            },

            operationA: function (callbackSuccess, callBackError) {
                setTimeout(function () {
                    callbackSuccess("Operation A Done");
                }, 3000);
            },


            operationB: function (callbackSuccess, callBackError) {
                setTimeout(function () {
                    callbackSuccess("Operation B Done");
                }, 3000);
            },

            vanillaWay: function () {
                operationA(function (resultA) {
                    console.log(resultA);
                    operationB(function (resultB) {
                        console.log(resultB);
                    }, showError)
                }, showError)
            },

            asyncOperationA: function () {
                return Q.Promise( function(resolve, reject, notify){
                    setTimeout(function () {
                        resolve("Operation A Done!");
                    }, 2500);
                });
            },

            asyncOperationB: function () {
                var deferred = Q.defer();
                setTimeout(function () {
                    deferred.resolve("Operation B Done!");
                }, 3000);
                return deferred.promise;
            },

            asyncOperationC: function () {
                var deferred = Q.defer();
                var i = 0;
                var timer = setInterval(function () {
                    if (i++ == 10) {
                        clearTimeout(timer);
                        deferred.resolve();
                    }
                    else {
                        deferred.notify(i);
                    }
                }, 500);
                return deferred.promise;
            },


            componentDidMount: function () {

                var self = this;
                this.setState({operationResultA: "Executing..."});

                this.asyncOperationA()
                    .then(function (result) {
                        self.setState({
                            operationResultA: result,
                            operationResultB: "Executing..."
                        });
                        return self.asyncOperationB();
                    })
                    .then(function (result) {
                        self.setState({operationResultB: result});
                    })
                    .catch(MessageHandler.showError);

                // notify progress bar
                this.asyncOperationC()
                    .progress(function (progress) {
                        self.setState({operationProgress: progress});
                    });

            },


            render: function () {

                var codeExample = "function(){\n" +
                    "\tvar deferred = $q.defer();\n" +
                    "\tsetTimeout(function () {\n" +
                    "\t\tresolve('Operation A Done!');\n"+
                    "\t}, 2500);\n" +
                    "\treturn deferred.promise;\n" +
                    "}";

                var width = {width: this.state.operationProgress * 10 + "%"};

                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("h2", null, "Example of Q Promises"), 
                                React.createElement("hr", null)
                            ), 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("pre", null, codeExample)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("span", null, "Operation A: ", this.state.operationResultA)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("span", null, "Operation B: ", this.state.operationResultB)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("div", {className: "progress"}, 
                                    React.createElement("div", {className: "progress-bar", role: "progressbar", 
                                         "aria-valuenow": this.state.operationProgress, "aria-valuemin": "0", 
                                         "aria-valuemax": "10", style: width}
                                    )
                                )
                            )
                        )
                    )
                )
            }
        })
    });
