define(['react', 'app/config', 'common/auth', 'jquery', 'typeahead'], function (React, $config, $auth, $jquery, __typeahead) {

	return React.createClass({

		propTypes: {
			id: React.PropTypes.string.isRequired,
			width: React.PropTypes.string.isRequired,
			onSelected: React.PropTypes.func,
			descriptor: React.PropTypes.string.isRequired,
			placeholder: React.PropTypes.string,
			title: React.PropTypes.string,
			url: React.PropTypes.string.isRequired

		},

		getInitialState: function () {
			return {suggestions: [], value: ''}
		},

		typeAheadElement: function () {
			var selector = '#' + this.props.id;
			return $jquery(selector);
		},

		remoteSettings: function () {
			var descriptor = this.props.descriptor;

			return {
				url: $config.webserviceRoot + this.props.url,
				ajax: {
					beforeSend: $auth.applyAuth
				},
				filter: function(items){
					return items.map(function(item){
						return {value: item[descriptor]};
					});
				}

			}
		},

		componentDidMount: function () {
			var bloodhound = new Bloodhound({
				datumTokenizer: function (d) {
					return Bloodhound.tokenizers.whitespace(d.value);
				},
				//Bloodhound.tokenizers.obj.whitespace(this.props.descriptor),
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				limit: 1000,
				remote: this.remoteSettings()
			});

			bloodhound.initialize();

			this.typeAheadElement().typeahead({
				hint: true,
				highlight: true,
				minLength: 1
			}, {
				name: this.props.id,
				displayKey: 'value',
				source: bloodhound.ttAdapter()
			});

			this.typeAheadElement().on('typeahead:selected', this.selectItem);
		},

		componentWillUnmount: function () {
			this.typeAheadElement().off('typeahead:selected', this.selectItem);
		},

		selectItem: function (event, suggestion) {
			// TODO
			console.log("Selected:" + JSON.stringify(suggestion));
		},

		render: function () {
			var containerTypeahead = 'container-typeahead';
			var widthstyle = containerTypeahead + ' form-group col-xs-' + this.props.width + ' col-sm-' + this.props.width;
			var label = this.props.title ? <label htmlFor={this.props.id}>{this.props.title}</label> : null;
			return (

				<div className={widthstyle}>
					{label}
					<input type="text"
						className="form-control typeahead"
						id={this.props.id}
						required={this.props.required === 'true'}
						placeholder={this.props.placeholder}
					/>

				</div>
			);
		}
	});

});

