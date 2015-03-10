 define(['react', 'common/event', 'restservice/generic.service','component/unit/unit.model'],
       function (React, $event, GenericService, UnitModel) {

    return React.createClass({
        propTypes : {
            model : React.PropTypes.any.isRequired
        },

        getInitialState: function () {
            return { model: this.props.model};
        },

        componentDidMount: function () {
            $event.addListener('model-changed-' + this.props.model.codigo, this.update);
        },

        componentWillUnmount: function () {
           $event.removeListener('model-changed-' + this.props.model.codigo);
        },

	    componentDidUpdate: function () {
		    var listener = $event.getListeners('model-changed-' + this.props.model.codigo);
		    if(!listener.length){
			    $event.addListener('model-changed-' + this.props.model.codigo, this.update);
		    }
	    },
		update : function(updatedModel){
			if(this.isMounted()) {
				this.setState({model: updatedModel});
			}
		},

        showDetails : function(){	       
	        var unitModel = <UnitModel model={this.props.model} />;
	        $event.emitEvent('show-details', [unitModel] );
        },

        render: function () {
            return (
                <a onClick={this.showDetails}>
                    <span>
                        <strong>{this.props.model.descricao}</strong>
                    </span>
                    <span>
                        <small>{this.props.model.simbolo}</small>                       
                    </span>
                </a>
            );
        }
    });
});
