define(function (require) {

    var React = require('react');

    return React.createClass({

            mixins : [React.addons.LinkedStateMixin],

            // Note: The LinkedStateMixin does not work for complex state objects!
            getInitialState: function () {
                return {text: ''}
            },

            render: function () {


                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("h2", null, "Example of using 2-way-Binding"), 
                                React.createElement("hr", null)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("form", null, 
                                    React.createElement("input", {className: "form-control", type: "text", placeholder: "Type here", valueLink: this.linkState("text")})
                                )
                            ), 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("pre", null, this.state.text)
                            )
                        )
                    )
                )
            }
        })
    });
