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
		'component/mixins/mixin.arrayfield',
	],

	function (React, $q, $jquery, __mask, $maskdefinitions, GenericService, Accordion, DropDownRest, TextInput, SuggestionInput, MixinArrayField) {

		function IcmsCstRules(cstCode) {
			var cst = cstCode;

			this.isModalidadeBC = function () {
				return cst == 00 || cst == 10 || cst == 20 || cst == 70 || cst == 90 || cst == 201 || cst == 202 || cst == 900;
			};

			this.isPercentualReducaoBC = function () {
				return cst == 10 || cst == 30 || cst == 70 || cst == 90 || cst == 201 || cst == 202 || cst == 203 || cst == 900;
			};

			this.isPercentualICMS = function () {
				return cst == 00 || cst == 10 || cst == 70 || cst == 90 || cst == 101 || cst == 201 || cst == 202 || cst == 900;
			};

			this.isModalidadeBCST = function () {
				return cst == 10 || cst == 30 || cst == 70 || cst == 90 || cst == 201 || cst == 202 || cst == 203 || cst == 900;
			};

			this.isPercentualValorAgregado = function () {
				return cst == 10 || cst == 30 || cst == 70 || cst == 90 || cst == 201 || cst == 202 || cst == 203 || cst == 900;
			};

			this.isPercentualReducaoCST = function () {
				return cst == 10 || cst == 30 || cst == 70 || cst == 90 || cst == 201 || cst == 202 || cst == 203 || cst == 900;
			};

			this.isPercentualSubstituicaoICMS = function () {
				return cst == 10 || cst == 20 || cst == 30 || cst == 70 || cst == 90 || cst == 201 || cst == 202 || cst == 203 || cst == 900;
			};

		}


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

			handleSuggestionCfop: function (suggestion) {
				this.state.model.Cfop = suggestion.id;
				this.notifyChanged();
			},

			projectionCfop: function(data){
				return {
					id : data.codigo,
					value : data.codigo + ' - ' + data.descricao
				};
			},

			render: function () {

				var cstRules = new IcmsCstRules(this.state.model.cstIcms);

				return (
					<Accordion id={this.createId("regratb-icms")} title="Regra Tributária ICMS" >
						<div className="row">
							<DropDownRest id={this.createId("cenarioDestino")} restservice={new GenericService("/destinoVenda")} onChange={this.handleSelected} valueDescriptor="name" descriptor="descricao" title="Destino da venda" required={true} width="6" tabindex="1" />
							<DropDownRest id={this.createId("cenarioCliente")} restservice={new GenericService("/tipoCliente")} onChange={this.handleSelected} valueDescriptor="name" descriptor="descricao" title="Tipo do Cliente" required={true} width="6" tabindex="2" />
						</div>
						<div className="row">
							<DropDownRest  id={this.createId("cstIcms")} restservice={new GenericService("/cstIcms")} onChange={this.handleSelected} valueDescriptor="value" descriptor="descricao" title="Cst" width="6" tabindex="3" placeholder="Digitar Código CST ou texto de busca" required={true}/>

						</div>

						<div className="row">
							{
								!cstRules.isModalidadeBC() ? null :
									<DropDownRest  id={this.createId("modBC")} restservice={new GenericService("/modalidadeBC")} onChange={this.handleSelected}  valueDescriptor="name" descriptor="descricao" title="Modalidade da Base" width="6" tabindex="4"/>
								}
							{
								!cstRules.isPercentualReducaoBC() ? null :
									<TextInput id={this.createId("perRedBC")} onBlur={this.handleChange} title='Percentual de Redução da BC' width="3" mask={$maskdefinitions.percentage}/>
								}
							{
								!cstRules.isPercentualICMS() ? null :
									<TextInput id={this.createId("perICMS")} onBlur={this.handleChange} title='Percentual de ICMS' width="3" mask={$maskdefinitions.percentage}/>
								}
						</div>

						<div className="row">
							{
								!cstRules.isModalidadeBCST() ? null :
									<DropDownRest id={this.createId("modBCSt")} restservice={new GenericService("/modalidadeBCST")} onChange={this.handleSelected} valueDescriptor="name" descriptor="descricao" title="Modalidade da Base de substituição" width="6" tabindex="7"/>
								}
							{
								!cstRules.isPercentualValorAgregado() ? null :
									<TextInput id={this.createId("perMargemVaST")} onBlur={this.handleChange} title='Percentual de Valor Agregado Setorial' width="3" mask={$maskdefinitions.percentage}/>
							}
							{
								!cstRules.isPercentualReducaoCST() ? null :
									<TextInput id={this.createId("perRedBCSt")} onBlur={this.handleChange} title='Percentual de Redução Substituição' width="3" mask={$maskdefinitions.percentage}/>
							}
							{
								!cstRules.isPercentualSubstituicaoICMS() ? null :
									<TextInput id={this.createId("perICMSST")} onBlur={this.handleChange} title='Percentual do ICMS de Substituição' width="3" mask={$maskdefinitions.percentage}/>
							}
						</div>

						<div className="row">
							<SuggestionInput id={this.createId("cFOP")} restService={new GenericService("/cfop")} projection={this.projectionCfop} title="CFOP do produto" width="6"  onSelected={this.handleSuggestionCfop} required={true} placeholder="Digitar Código CFOP ou texto de busca"  tabindex="11"/>
						</div>
					</Accordion>
				)
			}
		});

	});

