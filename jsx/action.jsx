define(['react'], function (React) {

	return React.createClass({

		propTypes: {
			do: React.PropTypes.func.isRequired,
			icon: React.PropTypes.string,
			tooltip: React.PropTypes.string
		},

		render: function () {
			return (
				<div className="pull-right">
					<button type="button" className="action btn btn-danger-animation" onClick={this.props.do} title={this.props.tooltip}>
						<span className={this.props.icon} aria-hidden="true"></span>
					</button>
				</div>
			)

		}
	});

});

