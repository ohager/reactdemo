define(['react', 'app/config'], function (React, $config) {

	return React.createClass({

		_timer : 0,

		propTypes: {
			id : React.PropTypes.string.isRequired,
			width : React.PropTypes.string.isRequired,
			restService : React.PropTypes.object.isRequired,
			onSelected : React.PropTypes.func.isRequired,
			descriptor : React.PropTypes.string.isRequired,
			placeholder : React.PropTypes.string,
			title : React.PropTypes.string,
			required: React.PropTypes.bool
		},

		getInitialState : function(){
			return {suggestions : [], value: '', selectedIndex: 0}
		},

		loadSuggestions : function(searchTerm){
			if(!this.isMounted())
				return;

			this.props.restService.getAll({
				textFilter: searchTerm,
				pagina: 1,
				numeroRegistros: $config.itemsPerSuggestion
			})
			.then(function (suggestions) {
				this.setState({suggestions: suggestions});
			}.bind(this))
		},

        loadSuggestionsLocal : function(searchterm){
            if(!this.isMounted())
                return;

            var suggestions = [
                {codigo: 1, descricao: 'Apfel'},
                {codigo: 2, descricao: 'Banane'},
                {codigo: 3, descricao: 'Birne'},
                {codigo: 4, descricao: 'Erdbeere'},
                {codigo: 5, descricao: 'Feige'},
                {codigo: 6, descricao: 'Stachelbeere'}
            ];

            suggestions = suggestions.filter(function(item){
                return item.descricao.indexOf(searchterm) != -1
            });

            this.setState({suggestions: suggestions});
        },


        onChange : function(event){
			this.setState({value :event.target.value });
			clearTimeout(this._timer);

			var searchTerm = event.target.value.trim();

			if(searchTerm===''){
				this.setState({suggestions: []});
				return;
			}
			this._timer = setTimeout(function () {
				this.state.suggestions = []; // clear suggestions without update
				this.loadSuggestions(searchTerm);
				// just for development
                //this.loadSuggestionsLocal(searchTerm);
			}.bind(this), 500);
		},

        resetSuggestion : function(){
            this.setState({suggestions: [], selectedIndex : 0});
        },

		selectItem : function(event){
            var selected = this.state.suggestions[this.state.selectedIndex];
            var value = selected[this.props.descriptor];
			this.props.onSelected(selected, this.props.id);
            this.setState({value: value});
            this.resetSuggestion()
		},

		createSuggestionItems : function(){
			var suggestionItems =  this.state.suggestions.map(function(suggestion, index){

                var marker = this.state.selectedIndex === index ? 'typeahead-suggestion selected' : 'typeahead-suggestion';

				return <li key={index} className={marker} ><a  data-id={suggestion.codigo} onClick={this.selectItem}>{suggestion[this.props.descriptor]}</a></li>
			}.bind(this));
			return suggestionItems.length === 0 ? null :
					<ul className="typeahead-dropdown-menu">
						{suggestionItems}
					</ul>;
		},

		onKeypress : function(event){

            if(this.state.suggestions.length===0){
                return;
            }

            switch(event.key){
                case 'ArrowUp':
                    var selectedIndex = this.state.selectedIndex;
                    this.setState({selectedIndex: selectedIndex > 0 ? --selectedIndex : 0 });
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    var selectedIndex = this.state.selectedIndex;
                    var maxIndex = this.state.suggestions.length - 1;
                    this.setState({selectedIndex: selectedIndex < maxIndex ? ++selectedIndex : maxIndex});
                    event.preventDefault();
                    break;
                case 'Tab':
                case 'Enter':
                    this.selectItem();
                    event.preventDefault();
                    break;
            }
		},

        getSuggestion : function(){
            return this.state.suggestions[this.state.selectedIndex] ? this.state.suggestions[this.state.selectedIndex] .descricao : "";
        },

		render: function () {
            var containerTypeahead ='container-typeahead' ;
			var widthstyle = containerTypeahead + ' form-group col-xs-' + this.props.width + ' col-sm-' + this.props.width;
			var isRequiredIcon = this.props.required ? <span className="glyphicon glyphicon-hand-left"  title="Campo obrigatório" aria-hidden="true"></span> : null
			var label = this.props.title ? <label htmlFor={this.props.id}>{this.props.title}&nbsp;{isRequiredIcon}</label> : null;
			return (

				<div className={widthstyle}>
					{label}
					<input type="text"
						className="form-control"
						id={this.props.id}
						placeholder={this.props.placeholder}
						onChange={this.onChange}
						onKeyDown ={this.onKeypress}
						required={this.props.required === 'true'}
						maxLength={100}
						value ={this.state.value}
					/>
					{this.createSuggestionItems()}
				</div>
			);
		}
	});

});

