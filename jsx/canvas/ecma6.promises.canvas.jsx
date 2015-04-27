define(function(require){

    var React = require('react');
    var Q = require('q');
    var MessageHandler = require('common/messagehandler');

        return React.createClass({

            getInitialState: function () {
                return {operationResultA: 'Pending...', operationResultB: 'Pending...', operationProgress: 0};
            },


            operationA: function () {
                return new Promise( function(resolve, reject){
                    setTimeout(function () {
                        resolve("Operation A Done!");
                    }, 2500);
                });
            },

            operationB: function () {
                return new Promise( function(resolve, reject) {
                    setTimeout(function () {
                        resolve("Operation B Done!");
                    }, 3000);
                });
            },

            operationC: function () {
                return new Promise( function(resolve, reject) {
                    setInterval(function () {
                        reject("Operation C failed");
                    }, 500);
                });
            },


            componentDidMount: function () {

                var self = this;
                this.setState({operationResultA: "Executing..."});

                this.operationA()
                    .then(function(result){
                        self.setState({
                            operationResultA: result,
                            operationResultB: "Executing..."
                        });
                        return self.operationB();
                    })
                    .then(function(result){
                        self.setState({
                            operationResultB: result
                        });
                        return self.operationC(); // will fail!
                    })
                    .then(function(){
                        // not reachable
                    })
                    .catch(MessageHandler.showError);
            },


            render: function () {

                var codeExample = "var promise = new Promise( \n" +
                    "\tfunction(resolve,reject){\n" +
                    "\t\tsetTimeout(function () {\n" +
                        "\t\t\tresolve('Operation A Done!');\n"+
                    "\t\t}, 2500);\n" +
                    "\t});";

                return (
                    <div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <h2>Example of ECMA Harmony Promises</h2>
                                <hr/>
                            </div>
                            <div className="col-xs-6 col-sm-6">
                                <pre>{codeExample}</pre>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <span>Operation A: {this.state.operationResultA}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <span>Operation B: {this.state.operationResultB}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    });
