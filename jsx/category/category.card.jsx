 define(['react', 'common/event', 'restservice/generic.service','component/category/category.model'],
       function (React, $event, GenericService, CategoryModel) {

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
	         var categoryModel = <CategoryModel  model={this.props.model} />;
	         $event.emitEvent('show-details', [categoryModel] );
        },

        render: function () {
            return (
                <a onClick={this.showDetails}>
                    <span>
                        <strong>{this.props.model.descricao}</strong>
                    </span>
                </a>
            );
        }
    });
});
