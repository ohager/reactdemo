define(['react'],
    function (React) {

        return React.createClass({

            mixins : [React.addons.LinkedStateMixin],

            // Note: The LinkedStateMixin does not work for complex state objects!
            getInitialState: function () {
                return {text: ''}
            },

            render: function () {


                return (
                    <div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <h2>Example of using 2-way-Binding</h2>
                                <hr/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6">
                                <form>
                                    <input className="form-control" type="text" placeholder="Type here" valueLink={this.linkState("text")}/>
                                </form>
                            </div>
                            <div className="col-xs-6 col-sm-6">
                                <span>Text typed: {this.state.text}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    });
