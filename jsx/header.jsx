define(['react', 'reactrouter'], function (React, Router) {

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
								<img src="images/logo.png" alt=""/>
							</a>
						</div>
						<div id="navbar" className="navbar-collapse collapse">
							<ul className="nav navbar-nav">
                              <li className="dropdown">
                                <a id="dropServico" href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false"><span className= "glyphicon glyphicon-wrench" aria-hidden="true"></span> Serviços <span className="caret"></span></a>
                                  <ul className="dropdown-menu" role="menu" aria-labelledby="dropServico">
                                    <MenuItem link="service" title="Serviços" />
                                </ul>
                              </li>
                              <li className="dropdown">
                                 <a id="dropVendas" href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false"><span className= "glyphicon glyphicon-usd" aria-hidden="true"></span> Vendas<span className="caret"></span></a>
                                  <ul className="dropdown-menu" role="menu" aria-labelledby="dropVendas">
	                                  <MenuItem link="customer" title="Cliente"/>
	                                  <MenuItem link="hauler" title="Transportadora"/>
                                  </ul>
                              </li>
                              <li className="dropdown">
                                 <a id="dropProdutos" href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false"><span className= "glyphicon glyphicon-inbox" aria-hidden="true"></span> Produtos<span className="caret"></span></a>
                                  <ul className="dropdown-menu" role="menu" aria-labelledby="dropProdutos">
	                                  <MenuItem link="category" title="Categoria"/>
                                      <MenuItem link="unit" title="Unidade"/>
	                                  <MenuItem link="supplier" title="Fornecedor"/>
	                                  <MenuItem link="product" title="Produto"/>
                                  </ul>
                              </li>
                              <li className="dropdown">
                                <a id="dropStore" href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false"><span className= "glyphicon glyphicon-briefcase" aria-hidden="true"></span> Lojas <span className="caret"></span></a>
                                  <ul className="dropdown-menu" role="menu" aria-labelledby="dropStore">
                                    <MenuItem link="store" title="Lojas" />
                                </ul>
                              </li>
                              <li className="dropdown">
                                <a id="dropUser" href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false"><span className= "glyphicon glyphicon-user" aria-hidden="true"></span> Usuários <span className="caret"></span></a>
                                  <ul className="dropdown-menu" role="menu" aria-labelledby="dropUser">
                                    <MenuItem link="user" title="Usuários" />
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


