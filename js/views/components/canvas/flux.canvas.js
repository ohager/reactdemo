define(function (require) {

    var React = require('react');
    var Flux = require('delorean').Flux;

    var store = Flux.createStore({
        items: [],
        actions: {
            // Remember the `dispatch('addItem')`
            'addItem': 'addItem',
            'removeItem' : 'removeItem'
        },
        addItem: function (item) {
            this.items.push(item.text);
            this.emit('change');
        },
        removeItem: function (index) {
            this.items.splice(index, 1);
            this.emit('change');
        },

        getState : function(){
            return {items: this.items};
        }
    });

    var Dispatcher = Flux.createDispatcher({
        addItem : function(obj){
            this.dispatch('addItem', obj);
        },

        removeItem : function(idx){
            this.dispatch('removeItem', idx);
        },

        getStores : function(){
            return {
                store : store
            }
        }
    });

    var ActionCreator = {
        addItem : function(text){
            Dispatcher.addItem({text: text});
        },
        removeItem : function(index){
            Dispatcher.removeItem(index);
        }
    };


    var Item = React.createClass({displayName: "Item",

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

            mixins : [Flux.mixins.storeListener],

            // Note: The LinkedStateMixin does not work for complex state objects!
            getInitialState: function () {
                return {text: ''}
            },

            componentDidMount : function(){
            },

            onTextChange : function(event){
                this.setState({text: event.target.value});
            },

            addItem : function(event){
                var itemtextNode = this.refs.itemText.getDOMNode();

                ActionCreator.addItem(itemtextNode.value);

                itemtextNode.value = "";
            },

            removeItem : function(idx){
                ActionCreator.removeItem(idx);
            },


            render: function () {

                var store = this.getStore('store');

                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-6 col-sm-6"}, 
                                React.createElement("h2", null, "Example of using Flux"), 
                                React.createElement("p", null, "This example shows the Flux Architecture Concept implemented using ", React.createElement("a", {href: "https://github.com/deloreanjs/delorean"}, "Delorean")), 
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
                                            
                                                store.items.map(function(item, index){
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
