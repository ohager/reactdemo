define(function (require) {

        var React = require('react');

        var EditorFrame = React.createClass(
            {
                propTypes: {
                    title: React.PropTypes.string.isRequired,
                    onSave: React.PropTypes.func.isRequired
                },

                getInitialState : function(){
                    return {data : {}};
                },

                change : function(data){
                    this.setState( {data : data});
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
                    this.props.onSave(this.state.data);
                },

                render: function () {
                    return (
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">{this.props.title}</h3>
                            </div>
                            <div className="panel-body">
                                {this.props.children}
                                <hr/>
                                <button className="btn btn-success pull-right" onClick={this.onSave}>Save</button>
                            </div>
                        </div>
                    )
                }
            }
        );


        var CustomerEditor = React.createClass({

            data: {},

            editorDataChanged: function (event) {
                this.data[event.target.name] = event.target.value;
                this.props.onChange(this.data); // propagate data model
            },

            render: function () {
                return (
                    <div>
                        <div className="form-group">
                            <input name="name" className="form-control" type="text" placeholder="Name"
                                   onChange={this.editorDataChanged}/>
                        </div>
                        <div className="form-group">
                            <input name="email" className="form-control" type="text" placeholder="Email"
                                   onChange={this.editorDataChanged}/>
                        </div>
                    </div>
                )
            }
        });

        var ProductEditor = React.createClass({

            data: {},

            editorDataChanged: function (event) {
                this.data[event.target.name] = event.target.value;
                this.props.onChange(this.data); // propagate data model
            },

            render: function () {
                return (
                    <div>
                        <div className="form-group">
                            <input name="productName" className="form-control" type="text"
                                   placeholder="Product Name"
                                   onChange={this.editorDataChanged}/>
                        </div>

                        <div className="form-group">
                            <textarea name="description" className="form-control" placeholder="Product Description"
                                      onChange={this.editorDataChanged}/>
                        </div >

                        <div className="form-group">
                            <input name="price" className="form-control" type="number" placeholder="Price"
                                   onChange={this.editorDataChanged}/>
                        </div>

                    </div>
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
                    <div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12">
                                <h2>Example of Composition Types</h2>
                                <hr/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <EditorFrame title="Customer Editor" onSave={this.onCustomerSave}>
                                    <CustomerEditor/>
                                </EditorFrame>
                            </div>
                            <div className="col-xs-6 col-sm-6">
                                <h4>Customer Data</h4>
                                <pre>{this.state.customerData}</pre>
                                <hr/>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <EditorFrame title="Product Editor" onSave={this.onProductSave}>
                                    <ProductEditor/>
                                </EditorFrame>
                            </div>
                            <div className="col-xs-6 col-sm-6">
                                <h4>Product Data</h4>
                                <pre>{this.state.productData}</pre>
                                <hr/>
                            </div>
                        </div>

                    </div>
                )
            }
        })
    });
