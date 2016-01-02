define(function (require) {

	var React = require('react');
	var Router = require('reactrouter');

	var Link = Router.Link;

	var MenuItem = React.createClass(
		{displayName: "MenuItem",
			render: function () {
				return (
					React.createElement("li", null, 
						React.createElement(Link, {to: this.props.link}, 							
							React.createElement("span", null, " ", this.props.title)
						)
					)
				)
			}
		}
	);

	return React.createClass({
		getInitialState: function () {
			return {menuClicked: false};
		},

		componentDidMount: function () {

		},


		render: function () {

			return (
				React.createElement("nav", {className: "navbar navbar-fixed-top"}, 
					React.createElement("div", {className: "container"}, 
						React.createElement("div", {className: "navbar-header"}, 
							React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", 
								"aria-expanded": "false", "aria-controls": "navbar"}, 
								React.createElement("span", {className: "sr-only"}), 
								React.createElement("span", {className: "icon-bar"}), 
								React.createElement("span", {className: "icon-bar"}), 
								React.createElement("span", {className: "icon-bar"})
							), 
							React.createElement("a", {className: "navbar-brand", href: "#"}, 
								React.createElement("img", {src: "images/logo.png", height: "48", alt: ""})
							)
						), 
						React.createElement("div", {id: "navbar", className: "navbar-collapse collapse"}, 
							React.createElement("ul", {className: "nav navbar-nav"}, 
                              React.createElement("li", {className: "dropdown"}, 
                                React.createElement("a", {id: "dropExample", href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", role: "button", "aria-expanded": "false"}, 
                                    React.createElement("span", {className: "glyphicon glyphicon-star-empty", "aria-hidden": "true"}), " Examples ", React.createElement("span", {className: "caret"})), 
                                  React.createElement("ul", {className: "dropdown-menu", role: "menu", "aria-labelledby": "dropExample"}, 
                                      React.createElement(MenuItem, {link: "twoway", title: "2-Way Binding"}), 
                                      React.createElement(MenuItem, {link: "notification", title: "Notifications"}), 
                                      React.createElement(MenuItem, {link: "mixin", title: "Mixin Example"}), 
                                      React.createElement(MenuItem, {link: "thousands", title: "Thousands"}), 
									  React.createElement(MenuItem, {link: "composition", title: "Coupled Composition"}), 
									  React.createElement(MenuItem, {link: "decoupledcomposition", title: "Decoupled Composition"})
                                )
                              ), 
                                React.createElement("li", {className: "dropdown"}, 
                                    React.createElement("a", {id: "dropDecorator", href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", role: "button", "aria-expanded": "false"}, 
                                        React.createElement("span", {className: "glyphicon glyphicon-record", "aria-hidden": "true"}), " Decorators ", React.createElement("span", {className: "caret"})), 
                                    React.createElement("ul", {className: "dropdown-menu", role: "menu", "aria-labelledby": "dropDecorator"}, 
                                        React.createElement(MenuItem, {link: "decorator.animation", title: "Animation"}), 
                                        React.createElement(MenuItem, {link: "decorator.logging", title: "Logging"}), 
                                        React.createElement(MenuItem, {link: "decorator.factory", title: "Decorator Factory"})
                                    )
                                ), 
								React.createElement("li", {className: "dropdown"}, 
									React.createElement("a", {id: "dropPromises", href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", role: "button", "aria-expanded": "false"}, 
										React.createElement("span", {className: "glyphicon glyphicon-retweet", "aria-hidden": "true"}), " Promises ", React.createElement("span", {className: "caret"})), 
									React.createElement("ul", {className: "dropdown-menu", role: "menu", "aria-labelledby": "dropPromises"}, 
										React.createElement(MenuItem, {link: "q", title: "Q"}), 
										React.createElement(MenuItem, {link: "harmony", title: "Native Promises"})
									)
								), 
                                React.createElement("li", {className: "dropdown"}, 
                                    React.createElement("a", {id: "dropFlux", href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", role: "button", "aria-expanded": "false"}, 
                                        React.createElement("span", {className: "glyphicon glyphicon-retweet", "aria-hidden": "true"}), " Flux ", React.createElement("span", {className: "caret"})), 
                                    React.createElement("ul", {className: "dropdown-menu", role: "menu", "aria-labelledby": "dropFlux"}, 
                                        React.createElement(MenuItem, {link: "nanoflux", title: "Simple Flux with Nanoflux"}), 
                                        React.createElement(MenuItem, {link: "fluxsimulator", title: "Flux Simulator"})
                                    )
                                )
							)
						)
					)
				)
			);
		}
	});
});


