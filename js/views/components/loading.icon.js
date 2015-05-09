define(function (require) {

	var React = require('react');

	var LoadingIcon = React.createClass( {displayName: "LoadingIcon",
		render: function () {
			return (
				React.createElement("div", {className: "loading"}, 
					React.createElement("span", {className: "ball"}), 
					React.createElement("span", {className: "ball-small"})
				)
			);
		}
	});

	return LoadingIcon;
});