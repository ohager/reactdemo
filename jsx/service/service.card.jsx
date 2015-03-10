define(['react', 'common/event', 'restservice/generic.service','component/service/service.model'], function (React, $event, GenericService, ServiceModel) {


    return React.createClass({
        propTypes : {
            model : React.PropTypes.any.isRequired
        },

        getInitialState: function () {
            return { model: this.props.model};
        },

        componentDidMount: function () {
            $event.addListener('model-changed-' + this.props.model.codigo, this.update);
	        $event.addListener('action-remove', this.remove);
        },

		componentWillUnmount: function () {
			$event.removeListener('model-changed-' + this.props.model.codigo);
			$event.removeListener('action-remove', this.remove);
		},

	    componentDidUpdate: function () {
		    var listener = $event.getListeners('model-changed-' + this.props.model.codigo);
		    if(!listener.length){
			    $event.addListener('model-changed-' + this.props.model.codigo, this.update);
		    }
	    },
	    remove : function(){

	    },


	    update : function(updatedModel){
			if(this.isMounted()) {
				this.setState({model: updatedModel});
			}
		},

        showDetails : function(){
	        var serviceModel = <ServiceModel model={this.props.model} />;
	        $event.emitEvent('show-details', [serviceModel] );
        },

        render: function () {
            return (
                <a onClick={this.showDetails}>
                    <span>
                        <strong>{this.props.model.descricao}</strong>                       
                    </span>
                    <span>
                        <small>{this.props.model.codServico}</small>
                        <small>{this.props.model.codPrefeitura}</small>
                        <small>{this.props.model.codTributacaoMunicipio}</small>
                    </span>
                </a>
            );
        }
    });
});


