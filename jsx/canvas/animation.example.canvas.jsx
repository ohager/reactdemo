define(function (require) {

        var React = require('react');
        var CSSTransitionGroup = React.addons.CSSTransitionGroup;

        return React.createClass({

            getInitialState: function () {
                return { items : ["Buy Beer", "Call Friends", "Drink Beer"]};
            },

            addItem : function(){
                var itemTextNode = this.refs.itemText.getDOMNode();
                var newItem = itemTextNode.value;
                if(newItem.length === 0) return;
                var newItems = this.state.items.concat([newItem]);
                this.setState({items: newItems});
                itemTextNode.value = "";
            },

            removeItem : function(index){
                this.state.items.splice(index, 1);
                this.forceUpdate();
            },

            render: function () {

                var items = this.state.items.map(function(item, index){
                   return (
                   <a className="list-group-item" key={index}>
                       <span className="glyphicon glyphicon-remove-circle pull-right" aria-hidden="true" onClick={this.removeItem.bind(this, index)} /><h4 className="list-group-item-heading">{item}</h4>
                   </a>
                   )
                }, this);

                return (
                    <div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <h2>Example of Functional Component (Animation)</h2>
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
                                            <input ref="itemText" type="text" className="form-control" placeholder="Enter Item Text..."/>
                                              <span className="input-group-btn">
                                                <button className="btn btn-default" type="button" onClick={this.addItem}>Add Item</button>
                                              </span>
                                            </div>
                                        <hr/>
                                        <div className="list-group">
                                            <CSSTransitionGroup transitionName="example">
                                                {items}
                                            </CSSTransitionGroup>
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
