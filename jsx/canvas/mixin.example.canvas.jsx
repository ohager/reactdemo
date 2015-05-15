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
                    <div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <h2>Example of creating and using Mixins</h2>
                                <p>This example shows how to create and use Mixins. In this case we use a validation mixin</p>
                                <hr/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <form>
                                    <label>CPF</label>
                                    <input className={this.state.isValid ? "form-control" : "form-control invalid"} type="text" placeholder="___.___.___-__" onChange={this.onTextChange}/>
                                    <small hidden={this.state.isValid}>CPF shall be of format ___.___.___-__</small>
                                </form>
                            </div>
                            <div className="col-xs-6 col-sm-6">
                                <pre>CPF {this.state.cpf}</pre>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    });
