define(function (require) {

        var React = require('react');
        var MessageHandler = require('common/messagehandler');

        return React.createClass({

            mixins : [React.addons.LinkedStateMixin],

            // Note: The LinkedStateMixin does not work for complex state objects!
            getInitialState: function () {
                return {text: ''}
            },

            onSubmit : function(event){
                MessageHandler.showInfo("Submitted: " + this.state.text);
            },

            render: function () {

                return (
                    <div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12">
                                <h2>Example of using Message Handler for Notifications</h2>
                                <hr/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-8 col-sm-8">
                                <form>
                                    <input className="form-control" type="text" placeholder="Type here" valueLink={this.linkState("text")}/>
                                    <button type="button" className="btn btn-success" onClick={this.onSubmit} disabled = {this.state.text.length === 0}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    });
