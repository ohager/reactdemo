define(function (require) {

	var React = require('react');
	var Router = require('reactrouter');

	var Link = Router.Link;

	var MenuItem = React.createClass(
		{
			render: function () {
				return (
					<li>
						<Link to={this.props.link}>							
							<span>&nbsp;{this.props.title}</span>
						</Link>                          
					</li>
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
				<nav className="navbar navbar-fixed-top">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
								aria-expanded="false" aria-controls="navbar">
								<span className="sr-only"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="#">
								<img src="images/logo.png" height="48" alt=""/>
							</a>
						</div>
						<div id="navbar" className="navbar-collapse collapse">
							<ul className="nav navbar-nav">
                              <li className="dropdown">
                                <a id="dropExample" href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">
                                    <span className= "glyphicon glyphicon-star-empty" aria-hidden="true"></span> Examples <span className="caret"></span></a>
                                  <ul className="dropdown-menu" role="menu" aria-labelledby="dropExample">
                                      <MenuItem link="twoway" title="2-Way Binding" />
                                      <MenuItem link="notification" title="Notifications" />
                                      <MenuItem link="mixin" title="Mixin Example" />
                                      <MenuItem link="thousands" title="Thousands" />
									  <MenuItem link="composition" title="Coupled Composition" />
									  <MenuItem link="decoupledcomposition" title="Decoupled Composition" />
                                </ul>
                              </li>
                                <li className="dropdown">
                                    <a id="dropDecorator" href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">
                                        <span className= "glyphicon glyphicon-record" aria-hidden="true"></span> Decorators <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu" aria-labelledby="dropDecorator">
                                        <MenuItem link="decorator.animation" title="Animation" />
                                        <MenuItem link="decorator.logging" title="Logging" />
                                        <MenuItem link="decorator.factory" title="Decorator Factory" />
                                    </ul>
                                </li>
								<li className="dropdown">
									<a id="dropPromises" href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">
										<span className= "glyphicon glyphicon-retweet" aria-hidden="true"></span> Promises <span className="caret"></span></a>
									<ul className="dropdown-menu" role="menu" aria-labelledby="dropPromises">
										<MenuItem link="q" title="Q" />
										<MenuItem link="harmony" title="Native Promises" />
									</ul>
								</li>
                                <li className="dropdown">
                                    <a id="dropFlux" href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">
                                        <span className= "glyphicon glyphicon-retweet" aria-hidden="true"></span> Flux <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu" aria-labelledby="dropFlux">
                                        <MenuItem link="flux" title="Simple Flux with Delorean" />
                                        <MenuItem link="nanoflux" title="Simple Flux with Nanoflux" />
                                    </ul>
                                </li>
							</ul>
						</div>
					</div>
				</nav>
			);
		}
	});
});


