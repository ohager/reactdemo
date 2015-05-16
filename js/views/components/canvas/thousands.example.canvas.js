define(function (require) {



        var React = require('react');

        return React.createClass({

            _start : 0,
            _end : 0,

            mixins: [React.addons.LinkedStateMixin],

            // Note: The LinkedStateMixin does not work for complex state objects!
            getInitialState: function () {
                return {rows: 50, columns: 20, randomColors: false, renderTime: 0}
            },

            componentWillMount : function(){

            },

            componentDidMount : function(){

            },

            componentWillUpdate : function(){
                this._start = window.performance.now();
            },

            componentDidUpdate : function(){
                this._end = window.performance.now();
                this.state.renderTime = (this._end - this._start).toFixed(2);
            },


            changeRandomColors : function(event){
                this.setState({randomColors : event.target.checked});
            },

            createRandomColor: function () {

                var r = Math.floor(Math.random() * 255) + 1;
                var g = Math.floor(Math.random() * 255) + 1;
                var b = Math.floor(Math.random() * 255) + 1;

                return {color: 'rgb(' + r + ',' + g + ',' + b + ')'};
            },

            createRow: function (n) {

                var cells = [];


                for (var i = 0; i < n; ++i) {
                    var cell = React.createElement("span", {key: i, className: "glyphicon glyphicon-asterisk", "aria-hidden": "true", style: this.state.randomColors ? this.createRandomColor() : {}});
                    cells.push(cell);
                }

                return cells;
            },

            createMatrix: function () {
                var rows = [];
                for (var i = 0; i < this.state.rows; ++i) {
                    var row = (
                        React.createElement("div", {key: i, className: "row"}, 
                            this.createRow(this.state.columns)
                        )
                    );
                    rows.push(row);
                }
                return rows;
            },

            render: function () {


                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-12 col-sm-12"}, 
                                React.createElement("h2", null, "Example of Thousands of Items"), 
                                React.createElement("p", null, "This example demonstrates the performance differences between partial (via virtual DOM) e complete DOM updates." + ' ' +
                                    "When random colors are disabled React does not update all symbols, hence is faster." + ' ' +
                                    "Randomized colors imply an update of all items."), 
                                React.createElement("hr", null)
                            )

                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-3 col-sm-3"}, 
                                React.createElement("input", {className: "form-control", type: "number", placeholder: "Number of Rows", valueLink: this.linkState("rows")})
                            ), 
                            React.createElement("div", {className: "col-xs-3 col-sm-3"}, 
                                React.createElement("input", {className: "form-control", type: "number", placeholder: "Number of Columns", valueLink: this.linkState("columns")})
                            ), 
                            React.createElement("div", {className: "col-xs-3 col-sm-3"}, 
                                React.createElement("div", {className: "checkbox"}, 
                                    React.createElement("label", null, 
                                        React.createElement("input", {type: "checkbox", onChange: this.changeRandomColors}), 
                                    " Randomize Colors")
                                )
                            ), 
                            React.createElement("div", {className: "col-xs-3 col-sm-3"}, 
                                React.createElement("pre", null, 'Render Time:' + this.state.renderTime + ' ms')
                            )
                        ), 
                        React.createElement("div", {className: "row"}
                        ), 
                        React.createElement("hr", null), 
                        React.createElement("div", {className: "panel panel-default"}, 
                            React.createElement("div", {className: "panel-heading"}, 
                                React.createElement("h3", {className: "panel-title"}, this.state.rows * this.state.columns, " + Elements ")
                            ), 
                            React.createElement("div", {className: "panel-body"}, 
                                this.createMatrix()
                            )
                        )
                    )
                )
            }
        })
    });

