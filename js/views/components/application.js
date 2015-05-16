define(	function (require) {

	var React = require('react');
	var Router = require('reactrouter');
	var Header = require('component/header');
	var Footer = require('component/footer');
	var Notification = require('component/notification');
	var TwoWayExampleCanvas = require('component/canvas/twoway.example.canvas');
	var NotificationExampleCanvas = require('component/canvas/notification.example.canvas');
	var ThousandsExampleCanvas = require('component/canvas/thousands.example.canvas');
	var CompositionExampleCanvas = require('component/canvas/composition.example.canvas');
	var DecoupledCompositionExampleCanvas = require('component/canvas/decoupledcomposition.example.canvas');
	var DecoratorExampleCanvas = require('component/canvas/decorator.example.canvas');
	var QPromisesCanvas = require('component/canvas/q.promises.canvas');
	var Ecma6PromisesCanvas = require('component/canvas/ecma6.promises.canvas');
    var MixinExampleCanvas = require('component/canvas/mixin.example.canvas');

	var RouteHandler = Router.RouteHandler;
	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;

	var Application = React.createClass({displayName: "Application",

		componentDidMount : function(){
		},

		render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement(Header, null), 
                    React.createElement("div", {className: "container"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement(Notification, null)
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement(RouteHandler, null)
                        )
                    ), 
                    React.createElement(Footer, null)
                )
            )

		}
	});

	var routes = (
    		React.createElement(Route, {name: "app", path: "/", handler: Application}, 
			React.createElement(Route, {name: "twoway", path: "example/twoway", handler: TwoWayExampleCanvas}), 
            React.createElement(Route, {name: "notification", path: "example/notification", handler: NotificationExampleCanvas}), 
            React.createElement(Route, {name: "thousands", path: "example/1000", handler: ThousandsExampleCanvas}), 
			React.createElement(Route, {name: "composition", path: "example/composition", handler: CompositionExampleCanvas}), 
			React.createElement(Route, {name: "decoupledcomposition", path: "example/composition/decoupled", handler: DecoupledCompositionExampleCanvas}), 
			React.createElement(Route, {name: "decorator", path: "example/decorator", handler: DecoratorExampleCanvas}), 
            React.createElement(Route, {name: "mixin", path: "example/mixin/validation", handler: MixinExampleCanvas}), 
			React.createElement(Route, {name: "q", path: "promises/q", handler: QPromisesCanvas}), 
			React.createElement(Route, {name: "harmony", path: "promises/harmony", handler: Ecma6PromisesCanvas}), 
			React.createElement(DefaultRoute, {handler: TwoWayExampleCanvas})
		)
	);

	return {
		start: function () {
			Router.run(routes, function (Handler) {
				React.render(React.createElement(Handler, null), document.body);
			});
		}
	}

});