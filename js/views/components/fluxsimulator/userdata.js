define(function (require) {



    var React = require('react');
    var NanoFlux = require('nanoflux');


    var UserItem = React.createClass({displayName: "UserItem",

        propTypes :{
            text : React.PropTypes.string.isRequired,
            onRemove : React.PropTypes.func.isRequired
        },

        render : function(){
            return (
                React.createElement("a", {className: "list-group-item"}, 
                        React.createElement("span", {className: "glyphicon glyphicon-remove-circle pull-right", "aria-hidden": "true", 
                              onClick: this.props.onRemove}), React.createElement("h4", {
                    className: "list-group-item-heading"}, this.props.text)
                )
            );
        }
    });

      return React.createClass({


            // Note: The LinkedStateMixin does not work for complex state objects!
            getInitialState: function () {
                return {text: '', todoItems: []}
            },

            componentWillMount: function(){
              todoStore.subscribe(this, this.onTodoStoreChanged);
            },

            componentDidMount : function(){
            },

            onTextChange : function(event){
                this.setState({text: event.target.value});
            },

            addItem : function(event){
                var itemtextNode = this.refs.itemText.getDOMNode();

                this.todoActions.addTodo(itemtextNode.value);

                itemtextNode.value = "";
            },

            removeItem : function(idx){
                this.todoActions.removeTodo(idx);
            },


            render: function () {


                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("h2", null, "Example of using Flux"), 
                                React.createElement("p", null, "This example shows the Flux Architecture Concept implemented using ", React.createElement("a", {href: "https://github.com/ohager/nanoflux"}, "Nanoflux")), 
                                React.createElement("a", {href: this.CanvasUrl, target: "_blank"}, "Code"), 
                                React.createElement("hr", null)
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("div", {className: "panel panel-default"}, 
                                    React.createElement("div", {className: "panel-heading"}, 
                                        React.createElement("h3", {className: "panel-title"}, "To Do Items")
                                    ), 
                                    React.createElement("div", {className: "panel-body"}, 
                                        React.createElement("div", {className: "input-group"}, 
                                            React.createElement("input", {ref: "itemText", type: "text", className: "form-control", 
                                                   placeholder: "Enter Item Text..."}), 
                              React.createElement("span", {className: "input-group-btn"}, 
                                React.createElement("button", {className: "btn btn-default", type: "button", onClick: this.addItem}, "Add Item"
                                )
                              )
                                        ), 
                                        React.createElement("hr", null), 
                                        React.createElement("div", {ref: "list", className: "list-group"}, 
                                            
                                                this.state.todoItems.map(function(item, index){
                                                    return React.createElement(Item, {key: index, text: item, onRemove: this.removeItem.bind(null,index)})
                                                }.bind(this))
                                            
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            }
        })
    });
