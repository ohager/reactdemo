define(['react', 'common/event', 'component/loading.icon'], function (React, $event, LoadingIcon) {

    return React.createClass({
        propTypes :{
            editorId : React.PropTypes.string.isRequired
        },

        getInitialState: function () {
            return { isOpened : false, isLoading : false};
        },

	    componentDidMount: function () {
		    $event.addListener('loading-started', this.showLoadingIcon);
		    $event.addListener('loading-finished', this.hideLoadingIcon);
	    },

	    componentWillUnmount: function () {
		    $event.removeListener('loading-started');
		    $event.removeListener('loading-finished');
	    },

	    showLoadingIcon : function(){
		    if(this.isMounted()) {
			    this.setState({isLoading: true});
		    }
	    },

	    hideLoadingIcon : function(){
		    if(this.isMounted()) {
			    this.setState({isLoading: false});
		    }
	    },

	    addNew: function (event) {
            this.props.onToggle(event);
            this.setState({isOpened : !this.state.isOpened});
            document.getElementById(this.props.editorId).classList.toggle('open');            
        },

        search: function (event) {
            var term = event.target.value;
            $event.emitEvent('search', [term]);
        },

        render: function () {

            return (
                <form>
                    <div className="input-group">
                    {this.state.isLoading ? <LoadingIcon/> : null}
                        <input type="search" className="form-control" onChange={this.search} placeholder="Pesquisar..."/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this.addNew} >
                                <span className={!this.state.isOpened ? 'glyphicon glyphicon-plus' : 'glyphicon glyphicon-minus'} aria-hidden="true"></span>
                            {!this.state.isOpened ? ' Adicionar' : ' Cancelar'}</button>
                        </span>
                    </div>
                </form>

            );
        }
    });
});


