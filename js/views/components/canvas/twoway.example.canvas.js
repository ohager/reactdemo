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
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("h2", null, "Example of using 2-way-Binding"), 
                                React.createElement("p", null, "This example shows two-way binding the manual way, and the LinkedStateMixin way"), 
                                React.createElement("hr", null)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("form", null, 
                                    React.createElement("label", null, "Manual 2-way"), 
                                    React.createElement("input", {className: "form-control", type: "text", placeholder: "Type here", onChange: this.onTextChange, value: this.state.text})
                                )
                            ), 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("pre", null, this.state.text)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("form", null, 
                                    React.createElement("label", null, "LinkedStateMixin"), 
                                    React.createElement("input", {className: "form-control", type: "text", placeholder: "Type here", valueLink: this.linkState("text")})
                                )
                            )
                        )

                    )
                )
            }
        })
    });
