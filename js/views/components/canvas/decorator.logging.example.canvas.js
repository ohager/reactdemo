define(function (require) {

    var React = require('react');
    var Event = require('common/event');

    var Logger = React.createClass({displayName: "Logger",

        // function backup store
        funcStore: {
            didUpdate: undefined,
            willUpdate: undefined
        },

        propTypes: {
            onLog: React.PropTypes.func
        },


        createTimestamp: function () {
            var d = new Date();
            return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '.' + d.getMilliseconds();
        },

        log: function (fname, msg) {
            // simple console logger... but we could extend it at our will, i.e using IndexedDB, or LocalStorage
            var logMsg = 'L[' + this.createTimestamp() + '] ' + fname;
            if (msg) {
                logMsg += ': ' + msg;
            }
            console.log(logMsg);

            // propagating to owner
            if (this.props.onLog) {
                this.props.onLog(logMsg);
            }
        },

        componentWillMount: function () {
            this.log('Mounting Component');
        },

        componentDidMount: function () {
            var state = this.props.children.type.prototype.getInitialState();
            var props = this.props.children.props;
            this.log('Component Mounted - Initial Props', JSON.stringify(props));
            this.log('Component Mounted - Initial State', JSON.stringify(state));


            // Here starts the magic.
            // We are deeply inspecting the child component, and hooking in its lifecycle methods.
            // override children component function - so, we are really decorating
            // Hint: we  need to backup the original function, and return to its prior behaviour when Logger gets unmounted.
            this.funcStore.willUpdate = this.props.children.type.prototype.componentWillUpdate;
            this.props.children.type.prototype.componentWillUpdate = function (nextProps, nextState) {
                if (this.funcStore.willUpdate) {
                    this.funcStore.willUpdate(nextProps, nextState);
                }
                this.log('Updating Component - Next Props', JSON.stringify(nextProps));
                this.log('Updating Component - Next State', JSON.stringify(nextState));

            }.bind(this);

            this.funcStore.didUpdate = this.props.children.type.prototype.componentDidUpdate;
            this.props.children.type.prototype.componentDidUpdate = function (prevProps, prevState) {
                if (this.funcStore.didUpdate) {
                    this.funcStore.didUpdate(prevProps, prevState);
                }
                this.log('Component Updated');
            }.bind(this);
        },

        componentWillUnmount: function () {
            this.log('Unmounting Component');

            // resetting its prior behaviour
            this.props.children.type.prototype.componentWillUpdate = this.funcStore.willUpdate;
            this.props.children.type.prototype.componentDidUpdate = this.funcStore.didUpdate;

        },

        render: function () {
            // we have no own rendering...
            return (
                React.createElement("div", null, 
                    this.props.children
                )
            )
        }
    });

    var InnerComponent = React.createClass({displayName: "InnerComponent",

        // this component does not have any outer relation with our logger!

        propTypes: {
            title: React.PropTypes.string.isRequired
        },

        getInitialState: function () {
            return {text: ''}
        },

        onTextChange: function (event) {
            var t = event.target.value;
            this.setState({text: t});
        },

        render: function () {
            return (
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                        React.createElement("form", null, 
                            React.createElement("label", null, this.props.title), 
                            React.createElement("input", {className: "form-control", type: "text", placeholder: "Enter text", 
                                   onChange: this.onTextChange})
                        )
                    )
                )
            )
        }

    });

    var LogComponent = React.createClass({displayName: "LogComponent",

        // using a variable we can keep track of log, even if component is not mounted.
        _logData: [],

        componentWillMount: function () {
            Event.addListener('addLog', this.addLog);
        },

        componentWillUnmount: function () {
            Event.removeListener('addLog', this.addLog);
        },

        addLog: function (logMsg) {
            this._logData.push(logMsg);

            // need to protect here, as we work with events
            // using events does not guarantee, that component is mounted when event arrives.
            if (this.isMounted()) {
                this.forceUpdate();
            }
        },

        onClear: function () {
            this._logData = [];
            this.forceUpdate();
        },

        render: function () {
            return (
                React.createElement("pre", null, 
                    React.createElement("button", {type: "button", className: "btn btn-warning", onClick: this.onClear}, "Clear"), 
                    React.createElement("hr", null), 
                    
                        this._logData.map(function (logItem, index) {
                            return (
                                React.createElement("span", {key: index}, logItem, React.createElement("br", null))
                            )
                        })
                    
                )
            );
        }
    });

    return React.createClass({

        onLog: function (logMsg) {
            // we communicate via events to prevent infinite rendering loops.
            // If it would be an update using states the entire component would be updated,
            // which leads to additional logging, and therefore a new onLog call, and so on and so forth...
            // This would make the application hang!
            Event.emit('addLog', [logMsg]);
        },

        render: function () {

            return (
                React.createElement("div", null, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                            React.createElement("h2", null, "Example of Logging Decorator"), 

                            React.createElement("p", null, "This example shows how to use the decorator pattern in ReactJS for logging purposes."), 
                            React.createElement("hr", null)
                        )
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                            React.createElement(Logger, {onLog: this.onLog}, 
                                React.createElement(InnerComponent, {title: "Input Field"})
                            )
                        ), 
                        React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                            React.createElement(LogComponent, null)
                        )
                    )
                )
            )
        }
    })
});
