define(function (require) {

        var React = require('react');

        return React.createClass({

            mixins: [React.addons.LinkedStateMixin],

            // Note: The LinkedStateMixin does not work for complex state objects!
            getInitialState: function () {
                return {rows: 50, columns: 20, randomColors: false}
            },

            componentWillMount : function(){

            },

            componentDidMount : function(){

            },

            componentWillUpdate : function(){

            },

            componentWillUpdate : function(){

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
                            <div className="col-xs-6 col-sm-6">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" onChange={this.changeRandomColors}/>
                                    &nbsp;Randomize Colors</label>
                                </div>
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

