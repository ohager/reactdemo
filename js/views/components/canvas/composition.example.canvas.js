define(function (require) {

        var React = require('react');

        var EditorFrame = React.createClass(
            {displayName: "EditorFrame",
                _model : {},

                propTypes: {
                    title: React.PropTypes.string.isRequired,
                    onSave: React.PropTypes.func.isRequired
                },

                getInitialState : function(){
                    return {data : {}};
                },

                change : function(data){
                    this._model = data;
                },

                setOwneeChangeCallback : function(){
                    this.props.children.props.onChange = this.change;
                },

                componentDidMount : function(){
                    this.setOwneeChangeCallback();
                },

                // need to reset the function, as it will be lost otherwise
                componentDidUpdate : function(){
                    this.setOwneeChangeCallback();
                },

                onSave: function (event) {
                    this.props.onSave(this._model);
                },

                render: function () {
                    return (
                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, 
                                React.createElement("h3", {className: "panel-title"}, this.props.title)
                            ), 
                            React.createElement("div", {className: "panel-body"}, 
                                this.props.children, 
                                React.createElement("hr", null), 
                                React.createElement("button", {className: "btn btn-success pull-right", onClick: this.onSave}, "Save")
                            )
                        )
                    )
                }
            }
        );


        var CustomerEditor = React.createClass({displayName: "CustomerEditor",

            data: {},

            editorDataChanged: function (event) {
                this.data[event.target.name] = event.target.value;
                this.props.onChange(this.data); // propagate data model
            },

            render: function () {
                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("input", {name: "name", className: "form-control", type: "text", placeholder: "Name", 
                                   onChange: this.editorDataChanged})
                        ), 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("input", {name: "email", className: "form-control", type: "text", placeholder: "Email", 
                                   onChange: this.editorDataChanged})
                        )
                    )
                )
            }
        });

        var ProductEditor = React.createClass({displayName: "ProductEditor",

            data: {},

            editorDataChanged: function (event) {
                this.data[event.target.name] = event.target.value;
                this.props.onChange(this.data); // propagate data model
            },

            render: function () {
                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("input", {name: "productName", className: "form-control", type: "text", 
                                   placeholder: "Product Name", 
                                   onChange: this.editorDataChanged})
                        ), 

                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("textarea", {name: "description", className: "form-control", placeholder: "Product Description", 
                                      onChange: this.editorDataChanged})
                        ), 

                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("input", {name: "price", className: "form-control", type: "number", placeholder: "Price", 
                                   onChange: this.editorDataChanged})
                        )

                    )
                )
            }
        });

        return React.createClass({

            getInitialState: function () {
                return {customerData: {}, productData: {}};
            },

            onCustomerSave: function (data) {
                this.setState({customerData: JSON.stringify(data)});
            },

            onProductSave: function (data) {
                this.setState({productData: JSON.stringify(data)});
            },

            render: function () {

                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-12 col-sm-12"}, 
                                React.createElement("h2", null, "Example of Coupled Composition"), 
                                React.createElement("p", null, "This example demonstrates the coupled composition, whereas a generic and reusable EditorFrame component owns" + ' ' +
                                    "different child components."
                                ), 
                                React.createElement("hr", null)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement(EditorFrame, {title: "Customer Editor", onSave: this.onCustomerSave}, 
                                    React.createElement(CustomerEditor, null)
                                )
                            ), 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("h4", null, "Customer Data"), 
                                React.createElement("pre", null, this.state.customerData), 
                                React.createElement("hr", null)
                            )
                        ), 
                        React.createElement("hr", null), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement(EditorFrame, {title: "Product Editor", onSave: this.onProductSave}, 
                                    React.createElement(ProductEditor, null)
                                )
                            ), 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("h4", null, "Product Data"), 
                                React.createElement("pre", null, this.state.productData), 
                                React.createElement("hr", null)
                            )
                        )
                    )
                )
            }
        })
    });
