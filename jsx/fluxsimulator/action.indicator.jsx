define(function (require) {

    var React = require('react');

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
            indicator.addEventListener("animationend", function () {
                indicator.removeEventListener("animationend");
                this.setState({show: false});
                if(this.props.onAnimationEnd) {
                    this.props.onAnimationEnd()
                }
            }.bind(this), false);
        },

        componentWillUnmount: function () {

            if(!this.refs.indicator) return;

            var indicator = this.refs.indicator.getDOMNode();
            indicator.removeEventListener("animationend");

        },
        render: function () {

            var divStyle = {
                backgroundColor: 'rgba(128,0,0,0.5)',
                top: this.props.position.y - 30 + 'px',
                left: this.props.position.x - 30 + 'px'
            };

            var classes = "action-indicator";

            return (
                    this.state.show ?
                    <div ref="indicator" className={classes} style={divStyle}>
                        <small>{this.props.name}</small>
                    </div>
                        :null
            )
        }
    })
});
