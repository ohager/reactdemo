define(function (require) {

    var React = require('react');


    var ValidateCpfMixin = {

        getInitialState : function(){
          return {isValid : false}
        },

        validateCpf : function(cpf){
            var isValid = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
            this.state.isValid = isValid;
        }
    };

    return React.createClass({

            mixins : [ValidateCpfMixin],

            // Note: The LinkedStateMixin does not work for complex state objects!
            getInitialState: function () {
                return {cpf: '-'}
            },

            onTextChange : function(event){
                var cpf = event.target.value;
                this.validateCpf(cpf);
                this.setState({cpf: this.state.isValid ? cpf : '-'});
            },

            render: function () {

                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("h2", null, "Example of creating and using Mixins"), 
                                React.createElement("p", null, "This example shows how to create and use Mixins. In this case we use a validation mixin"), 
                                React.createElement("hr", null)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("form", null, 
                                    React.createElement("label", null, "CPF"), 
                                    React.createElement("input", {className: this.state.isValid ? "form-control" : "form-control invalid", type: "text", placeholder: "___.___.___-__", onChange: this.onTextChange}), 
                                    React.createElement("small", {hidden: this.state.isValid}, "CPF shall be of format ___.___.___-__")
                                )
                            ), 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("pre", null, "CPF ", this.state.cpf)
                            )
                        )
                    )
                )
            }
        })
    });
