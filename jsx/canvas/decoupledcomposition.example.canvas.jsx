define(function (require) {

        var React = require('react');
        var $event = require('common/event');

        var SearchBox = React.createClass(
            {
                getInitialState: function () {
                    return {};
                },

                onSearchTermChanged: function (event) {
                    var searchTerm = event.target.value.trim();
                    $event.emitEvent('search', [searchTerm]);
                },

                render: function () {
                    return (
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="input-group">
                                    <span className="input-group-addon" id="basic-addon1"><span
                                        className="glyphicon glyphicon-search" aria-hidden="true"></span></span>
                                    <input type="search" placeholder="Enter Search Text (e.g. 'customer 10')" className="form-control"
                                           onChange={this.onSearchTermChanged}/>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        );


        var CustomerCard = React.createClass({

            propTypes: {
                name: React.PropTypes.string.isRequired,
                email: React.PropTypes.string,
                onClick : React.PropTypes.func
            },

            render: function () {
                return (
                    <a className="list-group-item" onClick={this.props.onClick}>
                        <h4 className="list-group-item-heading">{this.props.name}</h4>
                        <small>
                            <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                            &nbsp;{this.props.email}
                        </small>
                    </a>
                )
            }
        });

        var CustomerList = React.createClass({

            createCustomers: function () {
                var N = 400;
                var customers = [];
                for (var i = 0; i < N; ++i) {
                    customers.push({
                        name: "Customer " + i,
                        email: "user_" + i + "@customer.com"
                    })
                }

                return customers;
            },

            _allCustomers: [],

            getInitialState: function () {
                this._allCustomers = this.createCustomers();
                return {customers: []};
            },

            componentDidMount: function () {
                // start listening to EventEmitter, when component was mounted.
                $event.addListener('search', this.onSearch);
            },

            componentWillUnmount: function () {
                // remove the listener, before unmounting
                $event.removeListener('search', this.onSearch);
            },

            onSearch: function (searchTerm) {
                // here we protect ourselves against deferred/delayed events
                if (!this.isMounted()) return;

                var term = searchTerm.trim().toLowerCase();

                var foundCustomers = [];
                if (term.length > 0) {
                    var foundCustomers = this._allCustomers.filter(function (customer) {
                        return customer.name.toLowerCase().match(term) || customer.email.toLowerCase().match(term);
                    });
                }

                this.setState({customers: foundCustomers});

            },

            onItemClicked : function(index){
              console.log(JSON.stringify(this.state.customers[index]));
            },

            render: function () {

                var customerCards = this.state.customers.length === 0 ?
                    <h4>Please, search for items!</h4>
                    :
                    this.state.customers.map(function (customer, index) {
                        return <CustomerCard key={index} name={customer.name} email={customer.email} onClick={this.onItemClicked.bind(this, index)}/>;
                    }, this);

                return (
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Customers</h3>
                        </div>
                        <div className="panel-body">
                            <div className="list-group">
                                {customerCards}
                            </div>
                        </div>
                    </div>
                )
            }
        });


return React.createClass({

    render: function () {

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12">
                        <h2>Example of Decoupled Composition</h2>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12">
                        <SearchBox/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12">
                        <CustomerList/>
                    </div>
                </div>
            </div>
        )
    }
})
    });
