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
				onChange: React.PropTypes.func.isRequired,
				type: React.PropTypes.string.isRequired
			},

			getInitialState: function () {
				return {model: {}}
			},

			componentDidMount: function () {
			},

			onPanelClicked: function (event) {
				var isExpanded = this.refs.expandPanel.getDOMNode().getAttribute('aria-expanded');
				this.setState({isExpanded: isExpanded === 'true'});
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

				var isPis = this.props.type === "PIS";

				return (
					<Accordion id={this.createId("regratb-pis")} title={isPis ? "Regra Tributária PIS" : "Regra Tributária COFINS"}>
						<div className="row">
							<DropDownRest id={this.createId("cenarioDestino")} restservice={new GenericService("/destinoVenda")} onChange={this.handleSelected} valueDescriptor="name" descriptor="descricao" title="Destino da venda" required={true} width="6" tabindex="1" />
							<DropDownRest id={this.createId("cenarioCliente")} restservice={new GenericService("/tipoCliente")} onChange={this.handleSelected} valueDescriptor="name" descriptor="descricao" title="Tipo do Cliente" required={true} width="6" tabindex="2" />
						</div>

						<div className="row">
							{ isPis ?
								<DropDownRest id={this.createId("cstPis")} restservice={new GenericService("/cstPis")} onChange={this.handleSelected} valueDescriptor="name" descriptor="descricao" title="Operação PIS" required={true} width="6" tabindex="1" />
								:
								<DropDownRest id={this.createId("cstCofins")} restservice={new GenericService("/cstCofins")} onChange={this.handleSelected} valueDescriptor="name" descriptor="descricao" title="Operação COFINS" required={true} width="6" tabindex="1" />
							}
							<DropDownRest id={this.createId("tipoTributacao")} restservice={new GenericService("/tipoTributacao")} onChange={this.handleSelected} valueDescriptor="name" descriptor="descricao" title="Tipo de Tributação" required={true} width="6" tabindex="2" />
						</div>

						<div className="row">
						{ isPis ?
							<TextInput id={this.createId("perPIS")} onBlur={this.handleChange} title='Percentual do PIS' width="3" mask={$maskdefinitions.percentage}/>
							:
							<TextInput id={this.createId("perCOFINS")} onBlur={this.handleChange} title='Percentual do COFINS' width="3" mask={$maskdefinitions.percentage}/>
							}
						</div>
					</Accordion>
				)
			}
		});

	});

