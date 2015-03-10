define(['react', 'common/event'], function (React, $event) {

    return React.createClass({
        propTypes: {
            text : React.PropTypes.string
        },

        getInitialState: function () {
            return {};
        },

        componentDidMount: function () {
        },

        onClick : function(event){
          $event.emitEvent('more-button-click');
        },

        render: function () {

            return (
                <button type="button" className="btn btn-link pull-right" onClick={this.onClick}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> {this.props.text}
                </button>
            );
        }
    })
});