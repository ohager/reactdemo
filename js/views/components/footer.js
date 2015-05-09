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

				React.createElement("footer", {className: "navbar-fixed-bottom"}, 
					React.createElement("div", {className: "container"}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("p", null, "Don't miss my site: ", React.createElement("a", {href: "www.devbutze.com"}, "DevButze"), " ")
						)
					)
				)

			);
		}
	});
});


