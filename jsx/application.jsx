define(['react',
		'reactrouter',
		'common/event',
		'component/header',
		'component/footer',
		'component/notification',
		'component/service/service.canvas',
		'component/category/category.canvas',
		'component/unit/unit.canvas',
		'component/customer/customer.canvas',
		'component/hauler/hauler.canvas',				
		'component/product/product.canvas',
        'component/supplier/supplier.canvas',
        'component/store/store.canvas',
        'component/user/user.canvas'
	],

	function (React, Router, $event, Header, Footer, Notification, ServiceCanvas, CategoryCanvas, UnitCanvas, CustomerCanvas, HaulerCanvas, ProductCanvas, SupplierCanvas, StoreCanvas,  UserCanvas) {

	var RouteHandler = Router.RouteHandler;
	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;

	var Application = React.createClass({

		componentDidMount : function(){
		},


		render: function () {
            return (
                <div>
                    <Header/>
                    <div className="container">
                        <div className="row">
                            <Notification />
                        </div>
                        <div className="row">
                            <RouteHandler/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )

		}
	});

	var routes = (
		<Route name='app' path='/' handler={Application}>
			<Route name='service' path='servico/servico' handler={ServiceCanvas}/>
			<Route name='customer' path='vendas/cliente' handler={CustomerCanvas}/>
			<Route name='hauler' path='vendas/transportadora' handler={HaulerCanvas}/>
			<Route name='category' path='product/category' handler={CategoryCanvas}/>
			<Route name='unit' path='product/unit' handler={UnitCanvas}/>
			<Route name='product' path='product/product' handler={ProductCanvas}/>
			<Route name='supplier' path='product/supplier' handler={SupplierCanvas}/>
			<Route name='store' path='store/store' handler={StoreCanvas}/>
			<Route name='user' path='user/user' handler={UserCanvas}/>


			<DefaultRoute handler={ServiceCanvas}/>
		</Route>
	);

	return {
		start: function () {
			Router.run(routes, function (Handler) {
				React.render(<Handler/>, document.body);
			});
		}
	}

});