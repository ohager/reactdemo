define(function (require) {

    var React = require('react');
    var Event = require('common/event');

    var Logger = React.createClass({

        propTypes : {
            onLog : React.PropTypes.func
        },

        createTimestamp: function () {
            var d = new Date();
            return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '.' + d.getMilliseconds();
        },

        log: function (fname, msg) {
            // TODO: Experiment with indexedDb!
            var logMsg = 'L[' + this.createTimestamp() + '] ' + fname
            if(msg){
                logMsg += ': ' + msg;
            }
            // simple console logger... but we could extend it at our will!!
            console.log(logMsg);

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
            var funcCWU = this.props.children.type.prototype.componentWillUpdate;
            this.props.children.type.prototype.componentWillUpdate = function (nextProps, nextState) {
                if (funcCWU) {
                    funcCWU(nextProps, nextState);
                }
                this.log('Updating Component - Next Props', JSON.stringify(nextProps));
                this.log('Updating Component - Next State', JSON.stringify(nextState));

            }.bind(this);

            var funcCDU = this.props.children.type.prototype.componentDidUpdate;
            this.props.children.type.prototype.componentDidUpdate = function (prevProps, prevState) {
                if (funcCDU) {
                    funcCDU(prevProps, prevState);
                }
                this.log('Component Updated');
            }.bind(this);
        },

        componentWillUnmount: function () {
            this.log('Unmounting Component');
        },

        render: function () {
            // we have no own rendering...
            return this.props.children;
        }
    });

    var InnerComponent = React.createClass({

        // this component does not have any outer relation with our logger!

        getInitialState: function () {
            return {text: ''}
        },

        onTextChange: function (event) {
            var t = event.target.value;
            this.setState({text: t});
        },

        render: function () {
            return (
                <div className="row">
                    <div className="col-xs-6 col-sm-6">
                        <form>
                            <label>Input Field</label>
                            <input className="form-control" type="text" placeholder="Enter text"
                                   onChange={this.onTextChange}/>
                        </form>
                    </div>
                </div>
            )
        }

    });

    var LogComponent = React.createClass({

        _logData : [],

        componentWillMount : function()
        {
            Event.addListener('addLog', this.addLog);
        },

        componentWillUnmount : function()
        {
            Event.removeListener('addLog');
        },

        addLog : function(logMsg){
            this._logData.push(logMsg);
            if(this.isMounted()){
                this.forceUpdate();
            }
        },

        render : function() {
            return(
                <pre>
                    {
                        this._logData.map(function (logItem, index) {
                            return (
                                <span key={index}>{logItem}<br/></span>
                            )
                        })
                    }
                </pre>
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
                <div>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6">
                            <h2>Example of Logging Decorator</h2>
                            <p>This example shows how to use the decorator pattern in ReactJS for logging purposes.</p>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6">
                            <Logger onLog={this.onLog}>
                                <InnerComponent test="123"/>
                            </Logger>
                        </div>
                        <div className="col-xs-6 col-sm-6">
                            <LogComponent/>
                        </div>
                    </div>
                </div>
            )
        }
    })
});
