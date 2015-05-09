define(function (require) {

    var React = require('react');
    var CSSTransitionGroup = React.addons.CSSTransitionGroup;

    return React.createClass({

        getInitialState: function () {
            return {items: ["Buy Beer", "Call Friends", "Drink Beer"]};
        },

        addItem: function () {
            var itemTextNode = this.refs.itemText.getDOMNode();
            var newItem = itemTextNode.value;
            if (newItem.length === 0) return;
            var newItems = this.state.items.concat([newItem]);
            this.setState({items: newItems});
            itemTextNode.value = "";
        },

        removeItem: function (index) {
            this.state.items.splice(index, 1);
            this.forceUpdate();
        },

        render: function () {

            var items = this.state.items.map(function (item, index) {
                return (
                    React.createElement("a", {className: "list-group-item", key: index}, 
                        React.createElement("span", {className: "glyphicon glyphicon-remove-circle pull-right", "aria-hidden": "true", 
                              onClick: this.removeItem.bind(this, index)}), React.createElement("h4", {
                        className: "list-group-item-heading"}, item)
                    )
                )
            }, this);

            return (
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
                                React.createElement("div", {className: "list-group"}, 
                                    React.createElement(CSSTransitionGroup, {transitionName: "example"}, 
                                        items
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
