define(function (require) {

        var React = require('react');
        var $event = require('common/event');

        var SearchBox = React.createClass(
            {displayName: "SearchBox",
                getInitialState: function () {
                    return {};
                },

                onSearchTermChanged: function (event) {
                    var searchTerm = event.target.value.trim();
                    $event.emitEvent('search', [searchTerm]);
                },

                render: function () {
                    return (
                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "input-group"}, 
                                    React.createElement("span", {className: "input-group-addon", id: "basic-addon1"}, React.createElement("span", {
                                        className: "glyphicon glyphicon-search", "aria-hidden": "true"})), 
                                    React.createElement("input", {type: "search", placeholder: "Enter Search Text", className: "form-control", 
                                           onChange: this.onSearchTermChanged})
                                )
                            )
                        )
                    )
                }
            }
        );


        var CustomerCard = React.createClass({displayName: "CustomerCard",

            propTypes: {
                name: React.PropTypes.string.isRequired,
                email: React.PropTypes.string,
                onClick : React.PropTypes.func
            },

            render: function () {
                return (
                    React.createElement("a", {className: "list-group-item", onClick: this.props.onClick}, 
                        React.createElement("h4", {className: "list-group-item-heading"}, this.props.name), 
                        React.createElement("small", null, 
                            React.createElement("span", {className: "glyphicon glyphicon-envelope", "aria-hidden": "true"}), 
                            " ", this.props.email
                        )
                    )
                )
            }
        });

        var CustomerList = React.createClass({displayName: "CustomerList",

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
                    React.createElement("h4", null, "Please, search for items!")
                    :
                    this.state.customers.map(function (customer, index) {
                        return React.createElement(CustomerCard, {key: index, name: customer.name, email: customer.email, onClick: this.onItemClicked.bind(this, index)});
                    }, this);

                return (
                    React.createElement("div", {className: "panel panel-default"}, 
                        React.createElement("div", {className: "panel-heading"}, 
                            React.createElement("h3", {className: "panel-title"}, "Customers")
                        ), 
                        React.createElement("div", {className: "panel-body"}, 
                            React.createElement("div", {className: "list-group"}, 
                                customerCards
                            )
                        )
                    )
                )
            }
        });


return React.createClass({

    render: function () {

        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-12 col-sm-12"}, 
                        React.createElement("h2", null, "Example of Decoupled Composition"), 
                        React.createElement("hr", null)
                    )
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-12 col-sm-12"}, 
                        React.createElement(SearchBox, null)
                    )
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-xs-12 col-sm-12"}, 
                        React.createElement(CustomerList, null)
                    )
                )
            )
        )
    }
})
    });
