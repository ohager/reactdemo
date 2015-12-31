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


    var Item = React.createClass({

        propTypes :{
            text : React.PropTypes.string.isRequired,
            onRemove : React.PropTypes.func.isRequired
        },

        render : function(){
            return (
                <a className="list-group-item">
                        <span className="glyphicon glyphicon-remove-circle pull-right" aria-hidden="true"
                              onClick={this.props.onRemove}/><h4
                    className="list-group-item-heading">{this.props.text}</h4>
                </a>
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
                    <div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <h2>Example of using Flux</h2>
                                <p>This example shows the Flux Architecture Concept implemented using <a href="https://github.com/deloreanjs/delorean">Delorean</a></p>
                                <hr/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">To Do Items</h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="input-group">
                                            <input ref="itemText" type="text" className="form-control"
                                                   placeholder="Enter Item Text..."/>
                              <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={this.addItem}>Add Item
                                </button>
                              </span>
                                        </div>
                                        <hr/>
                                        <div ref="list" className="list-group">
                                            {
                                                store.items.map(function(item, index){
                                                    return <Item key={index} text={item} onRemove={this.removeItem.bind(null,index)} />
                                                }.bind(this))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    });
