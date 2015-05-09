define(function (require) {

    var React = require('react');
    var MessageHandler = require('common/messagehandler');

    return React.createClass({

        getInitialState: function () {
            return {operationResultA: 'Pending...', operationResultB: 'Pending...', operationProgress: 0};
        },


        operationA: function () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve("Operation A Done!");
                }, 2500);
            });
        },

        operationB: function () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve("Operation B Done!");
                }, 3000);
            });
        },

        operationC: function () {
            return new Promise(function (resolve, reject) {
                setInterval(function () {
                    reject("Operation C failed");
                }, 500);
            });
        },


        componentDidMount: function () {

            var self = this;
            this.setState({operationResultA: "Executing..."});

            this.operationA()
                .then(function (result) {
                    self.setState({
                        operationResultA: result,
                        operationResultB: "Executing..."
                    });
                    return self.operationB();
                })
                .then(function (result) {
                    self.setState({
                        operationResultB: result
                    });
                    return self.operationC(); // will fail!
                })
                .then(function () {
                    // not reachable
                })
                .catch(MessageHandler.showError);
        },


        render: function () {

            var codeExample = "var promise = new Promise( \n" +
                "\tfunction(resolve,reject){\n" +
                "\t\tsetTimeout(function () {\n" +
                "\t\t\tresolve('Operation A Done!');\n" +
                "\t\t}, 2500);\n" +
                "\t});";

            return (
                React.createElement("div", null, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                            React.createElement("h2", null, "Example of ECMA Harmony Promises"), 
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
                    )
                )
            )
        }
    })
});
