define(['react', 'common/event'], function (React, $event) {

    return React.createClass({
        getInitialState: function () {
            return {};
        },

        componentDidMount: function () {
        },

        submit : function(event){
            event.preventDefault();
            $event.emitEvent('save', [this.refs.editorForm]);
        },

        render: function () {

            return (

                <form ref="editorForm" onSubmit={this.submit}>
                        {this.props.children}
                    <div className="row ">
                        <div className="form-group col-xs-12 col-sm-12">
                            <button type="submit" className="btn btn-default pull-right">
                                <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span><span>&nbsp;</span>Cadastrar</button>
                        </div>
                    </div>
                </form>

            );
        }
    });
});


