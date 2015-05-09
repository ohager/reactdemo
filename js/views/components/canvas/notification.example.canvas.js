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
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-12 col-sm-12"}, 
                                React.createElement("h2", null, "Example of using Message Handler for Notifications"), 
                                React.createElement("hr", null)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-8 col-sm-8"}, 
                                React.createElement("form", null, 
                                    React.createElement("input", {className: "form-control", type: "text", placeholder: "Type here", valueLink: this.linkState("text")}), 
                                    React.createElement("button", {type: "button", className: "btn btn-success", onClick: this.onSubmit, disabled: this.state.text.length === 0}, "Submit")
                                )
                            )
                        )
                    )
                )
            }
        })
    });
