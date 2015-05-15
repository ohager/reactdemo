define(function (require) {

    var React = require('react');

    return React.createClass({

            mixins : [React.addons.LinkedStateMixin],

            // Note: The LinkedStateMixin does not work for complex state objects!
            getInitialState: function () {
                return {text: ''}
            },

            onTextChange : function(event){
                this.setState({text: event.target.value});
            },

            render: function () {

                return (
                    <div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <h2>Example of using 2-way-Binding</h2>
                                <p>This example shows two-way binding the manual way, and the LinkedStateMixin way</p>
                                <hr/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <form>
                                    <label>Manual 2-way</label>
                                    <input className="form-control" type="text" placeholder="Type here" onChange={this.onTextChange} value={this.state.text}/>
                                </form>
                            </div>
                            <div className="col-xs-6 col-sm-6">
                                <pre>{this.state.text}</pre>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <form>
                                    <label>LinkedStateMixin</label>
                                    <input className="form-control" type="text" placeholder="Type here" valueLink={this.linkState("text")}/>
                                </form>
                            </div>
                        </div>

                    </div>
                )
            }
        })
    });
