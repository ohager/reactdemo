define([
        'react',
        'common/messagehandler'
        ],
    function (React, $messageHandler) {

        return React.createClass({

            mixins : [React.addons.LinkedStateMixin],

            // Note: The LinkedStateMixin does not work for complex state objects!
            getInitialState: function () {
                return {text: ''}
            },

            onSubmit : function(event){
                $messageHandler.showInfo("Submitted: " + this.state.text);
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
                                    <input type="button" className="btn btn-success" onClick={this.onSubmit}>Submit</input>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    });
