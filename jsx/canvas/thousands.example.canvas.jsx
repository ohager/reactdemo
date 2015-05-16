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
                    var cell = <span key={i} className="glyphicon glyphicon-asterisk" aria-hidden="true" style={this.state.randomColors ? this.createRandomColor() : {}}></span>;
                    cells.push(cell);
                }

                return cells;
            },

            createMatrix: function () {
                var rows = [];
                for (var i = 0; i < this.state.rows; ++i) {
                    var row = (
                        <div key ={i} className="row">
                            {this.createRow(this.state.columns)}
                        </div>
                    );
                    rows.push(row);
                }
                return rows;
            },

            render: function () {


                return (
                    <div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12">
                                <h2>Example of Thousands of Items</h2>
                                <p>This example demonstrates the performance differences between partial (via virtual DOM) e complete DOM updates.
                                    When random colors are disabled React does not update all symbols, hence is faster.
                                    Randomized colors imply an update of all items.</p>
                                <hr/>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-sm-3">
                                <input className="form-control" type="number" placeholder="Number of Rows" valueLink={this.linkState("rows")}/>
                            </div>
                            <div className="col-xs-3 col-sm-3">
                                <input className="form-control" type="number" placeholder="Number of Columns" valueLink={this.linkState("columns")}/>
                            </div>
                            <div className="col-xs-3 col-sm-3">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" onChange={this.changeRandomColors}/>
                                    &nbsp;Randomize Colors</label>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3">
                                <pre>{'Render Time:' + this.state.renderTime + ' ms'}</pre>
                            </div>
                        </div>
                        <div className="row">
                        </div>
                        <hr/>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">{this.state.rows * this.state.columns} + Elements </h3>
                            </div>
                            <div className="panel-body">
                                {this.createMatrix()}
                            </div>
                        </div>
                    </div>
                )
            }
        })
    });

