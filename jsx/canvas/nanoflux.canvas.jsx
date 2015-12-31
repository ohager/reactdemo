define(function (require) {

    var React = require('react');
    var NanoFlux = require('nanoflux');

    // setting up Flux
    var dispatcher = NanoFlux.createDispatcher('dispatcher');
    var todoStore = NanoFlux.createStore('todoStore', {
        _todos : [],
        onAddTodo : function(todoItem){
            this._todos.push(todoItem);
            this._propagateChanges();
        },
        onRemoveTodo : function(todoId){
            this._todos.splice(todoId, 1);
            this._propagateChanges();
        },
        _propagateChanges : function(){
            this.notify(this._todos);
        }
    });

    dispatcher.connectTo(todoStore);

    NanoFlux.createActions('todoActions', dispatcher, {
        addTodo : function(todoItem){
            this.dispatch('addTodo', todoItem);
        },
        removeTodo : function(itemIndex){
            this.dispatch('removeTodo', itemIndex);
        }
    });

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

            todoActions : NanoFlux.getActions('todoActions'),
            todoStore : NanoFlux.getStore('todoStore'),

            onTodoStoreChanged : function(todos){
                this.setState({todoItems : todos});
            },

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
                    <div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <h2>Example of using Flux</h2>
                                <p>This example shows the Flux Architecture Concept implemented using <a href="https://github.com/ohager/nanoflux">Nanoflux</a></p>
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
                                                this.state.todoItems.map(function(item, index){
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
