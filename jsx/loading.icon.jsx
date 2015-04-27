define(function (require) {

	var React = require('react');

	var LoadingIcon = React.createClass( {
		render: function () {
			return (
				<div className="loading">
					<span className="ball"></span>
					<span className="ball-small"></span>
				</div>
			);
		}
	});

	return LoadingIcon;
});