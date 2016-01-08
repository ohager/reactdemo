define(function (require) {

    var React = require('react');
    var Snabbt = require('snabbt');

    return React.createClass({

        propTypes : {
            name : React.PropTypes.string.isRequired,
            position : React.PropTypes.shape({
                x: React.PropTypes.number.isRequired,
                y: React.PropTypes.number.isRequired
            }).isRequired,
            onAnimationEnd : React.PropTypes.func
        },

        getInitialState: function () {
            return {show: true}
        },

        componentWillMount: function () {
        },

        componentDidMount: function () {

            if(!this.refs.indicator) return;

            var indicator = this.refs.indicator.getDOMNode();

            Snabbt(indicator, {
                scale : [2.0,2.0],
                opacity: 0.0,
                fromOpacity: 1.0,
                duration: 750,
                easing: 'ease',
                allDone: function(){
                    this.setState({show: false});
                    if(this.props.onAnimationEnd) {
                        this.props.onAnimationEnd();
                    }
                }.bind(this)
            })

        },

        componentWillUnmount: function () {

            if(!this.refs.indicator) return;

        },
        render: function () {

            var divStyle = {
                top: this.props.position.y - 30 + 'px',
                left: this.props.position.x - 30 + 'px'
            };

            var classes = "click-indicator";

            return (
                    this.state.show ?
                    React.createElement("div", {ref: "indicator", className: "click-indicator", style: divStyle}, 
                        React.createElement("small", null, this.props.name)
                    )
                        :null
            )
        }
    })
});
