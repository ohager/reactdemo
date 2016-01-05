define(function (require) {

    require('component/fluxsimulator/fluxconfig');
    var React = require('react');
    var NanoFlux = require('nanoflux');

    return React.createClass({

        visualizationStore: NanoFlux.getStore('visualizationStore'),
        visualizationActions: NanoFlux.getActions('visualizationActions'),
        _subscription: null,
        _mousepos: {
            x: 0,
            y: 0
        },

        updateMousePosition: function (mouseEvent) {
            this._mousepos = {
                x: mouseEvent.pageX,
                y: mouseEvent.pageY
            };
        },

        getInitialState: function () {
            return {actionName: '', mousepos: this._mousepos, show: false}
        },

        onActionTriggered: function (action) {
            if(this.isMounted()) {
                this.setState({actionName: action.name, mousepos: this._mousepos, show: true});
            }
        },

        componentWillMount: function () {
            this.visualizationStore.subscribe(this, this.onActionTriggered);
        },

        componentDidMount: function () {
            window.addEventListener('mousedown', this.updateMousePosition);
            var indicator = this.refs.indicator.getDOMNode();
            indicator.addEventListener("animationend", function () {
                this.setState({show: false});
            }.bind(this), false);

        },

        componentWillUnmount: function () {
            if (this._subscription) {
                this._subscription.unsubscribe();
            }
            window.removeEventListener('mousedown', this.updateMousePosition);

            var indicator = this.refs.indicator.getDOMNode();
            indicator.removeEventListener("animationend");

        },
        render: function () {

            var divStyle = {
                backgroundColor: 'rgba(128,0,0,0.5)',
                top: this.state.mousepos.y - 30 + 'px',
                left: this.state.mousepos.x - 30 + 'px'
            };

            var classes = "action-indicator";

            return (
                React.createElement("div", {ref: "indicator"}, 
                    this.state.show ?
                    React.createElement("div", {className: classes, style: divStyle}, 
                        React.createElement("small", null, this.state.actionName)
                    )
                        :null
                )
            )
        }
    })
});
