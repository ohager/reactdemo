define(function (require) {

	var React = require('react');

	return React.createClass({
		getInitialState: function () {
			return {};
		},

		componentDidMount: function () {
		},

		render: function () {

			return (

				<footer className="navbar-fixed-bottom">
					<div className="container">
						<div className="row">
							<p>Don't miss my site: <a href="https://www.devbutze.com">DevButze</a> </p>
						</div>
					</div>
				</footer>

			);
		}
	});
});


