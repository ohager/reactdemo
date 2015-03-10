define(['react',
		'q',
		'jquery',
		'jqueryMask',
		'common/maskdefinitions',
		'restservice/generic.service',
		'component/accordion',
		'component/dropdown.rest',
		'component/text.input',
		'component/suggestion.input',
		'component/mixins/mixin.arrayfield'
	],

	function (React, $q, $jquery, __mask, $maskdefinitions, GenericService, Accordion, DropDownRest, TextInput, SuggestionInput, MixinArrayField) {


		return React.createClass({

			mixins: [MixinArrayField],

			propTypes: {
				id: React.PropTypes.string.isRequired,
				onChange: React.PropTypes.func.isRequired
			},

			getInitialState: function () {
				return {model: {}}
			},

			componentDidMount: function () {
			},


			notifyChanged: function () {
				this.props.onChange(this.state.model, this.props.id);
			},

			handleChange: function (event) {
				var id = this.extractNameFromId(event.target.id);
				this.state.model[id] = $jquery(event.target).val(); // auto unmask
				this.notifyChanged();
				this.forceUpdate();
			},

			handleSelected: function (event) {
				var id = this.extractNameFromId(event.target.id);
				this.state.model[id] = event.target.selectedOptions[0].value;
				this.notifyChanged();
				this.forceUpdate();
			},

			render: function () {

				return (
					<Accordion id={this.createId("regratb-ipi")} title="Regra Tributária IPI">
							<div className="row">
								<DropDownRest id={this.createId("cenarioDestino")} restservice={new GenericService("/destinoVenda")} onChange={this.handleSelected} valueDescriptor="name" descriptor="descricao" title="Destino da venda" required={true} width="6" tabindex="1" />
								<DropDownRest id={this.createId("cenarioCliente")} restservice={new GenericService("/tipoCliente")} onChange={this.handleSelected} valueDescriptor="name" descriptor="descricao" title="Tipo do Cliente" required={true} width="6" tabindex="2" />
							</div>

							<h2>Faltam informacoes para concluir!</h2>
					</Accordion>
				)
			}
		});

	});

