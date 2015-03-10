define(['react',
		'common/event',
		'common/messagehandler',
		'restservice/generic.service',
		'jquery',
		'jqueryMask',
		'common/maskdefinitions',
		'component/text.input',
		'component/text.area',
		'component/dropdown.rest',
		'component/suggestion.input',
		'component/array',
		'component/nfe/regra.tributaria.icms.field',
		'component/nfe/regra.tributaria.ipi.field',
		'component/nfe/regra.tributaria.piscofins.field',
		'component/nfe/regra.tributaria.info.field'
	],


	function (React, $event, $messageHandler, GenericService, $jquery, ___mask, $maskdefinitions,
	          TextInput, TextArea, DropDownRest, SuggestionInput, Array,
	          RegraTributariaIcmsField, RegraTributariaIpiField, RegraTributariaPisCofinsField, RegraTributariaInfoField) {

		function getInitialModel() {
			return {
				codigo: null,
				codAlfa: '',
				descricao: '',
				valorVenda: 0,
				valorCusto: 0,
				codigoEan: '',
				pesoLiquido: 0,
				pesoBruto: 0,
				observacao: '',
				categoria: null,
				fornecedor: null,
				unidade: null,
				ncm: null,
				regrasTribICMS : [],
				regrasTribIPI : [],
				regrasTribPIS : [],
				regrasTribCONFINS : [],
				regrasTribInfoNFe : []
			};
		}

		return React.createClass({

			_internalModel: getInitialModel(),

			getInitialState: function () {
				return {};
			},
			componentDidMount: function () {
				$event.addListener('save', this.saveData);
			},
			componentWillUnmount: function () {
				$event.removeListener('save', this.saveData);
			},
			saveData: function (editorForm) {
				var service = new GenericService('/produto');

				service.create(this._internalModel).then(function () {
					$event.emitEvent('update-list');
					this.reset(editorForm);
					$messageHandler.showSuccess("Produto criado com sucesso");
				}.bind(this));
			},
			reset: function (formElement) {
				this.setState({model: this._internalModel});
				formElement.getDOMNode().reset();
			},
			handleChange: function (event) {
				var id = this.extractNameFromId(event.target.id);
				this._internalModel[id] = $jquery(event.target).val(); // auto unmask
				this.setState({model: this._internalModel});
			},

			handleSelect: function (suggestion, id) {
				this._internalModel[id] = suggestion.codigo;
				this.setState({model: this._internalModel});
			},

			handleOrigemProdutoChange : function(event){
				this._internalModel.origemProduto= event.target.selectedOptions[0].value;
				this.setState({model: this._internalModel});
			},

			onIcmsChange : function(icmsModel){
				this._internalModel.regrasTribICMS = icmsModel;
				this.setState({model: this._internalModel});
			},

			onIpiChange : function(ipiModel){
				this._internalModel.regrasTribIPI = ipiModel;
				this.setState({model: this._internalModel});
			},

			onPisChange : function(pisModel){
				this._internalModel.regrasTribPIS = pisModel;
				this.setState({model: this._internalModel});
			},

			onCofinsChange : function(cofinsModel){
				this._internalModel.regrasTribCOFINS = cofinsModel;
				this.setState({model: this._internalModel});
			},

			onCofinsChange : function(infoNfeModel){
				this._internalModel.regrasTribInfoNFe = infoNfeModel;
				this.setState({model: this._internalModel});
			},


			projectionStandard : function(item){
				return {
					id : item.codigo,
					value : item.descricao
				}
			},

			projectionFornecedor : function(fornecedor){
				return {
					id:  fornecedor.codigo,
					value: fornecedor.fantasia
				}
			},

			projectionNcm : function(ncm){
				return {
					id:  ncm.codigo,
					value: ncm.codStr
				}
			},

			render: function () {

				return (

					<div>

						<div className="row">
							<TextInput id="codAlfa"  onBlur={this.handleChange} title="Codígo do Produto" tooltip="Codígo do Produto" width="12" required={true} maxLength={50} tabindex="1" />
						</div>
						<div className="row">
							<TextInput id="descricao"  onBlur={this.handleChange} title="Descrição" tooltip="Descrição do Produto" width="12" required={true} maxLength={150} tabindex="2" />
						</div>
						<div className="row">
							<TextInput id="valorVenda" onBlur={this.handleChange} title="Preço de Venda" width="6" required={true} maxLength={15} tabindex="3" mask={$maskdefinitions.currency}/>
							<TextInput id="valorCusto" onBlur={this.handleChange} title="Preço de Custo" width="6" maxLength={15} tabindex="4" mask={$maskdefinitions.currency}/>
						</div>
						<div className="row">
							<TextInput id="codigoEan"  onBlur={this.handleChange} title="Códígo de barras" tooltip="Código de barras" width="12" tabindex="5" />
						</div>
						<div className="row">
							<TextInput id="pesoLiquido" onBlur={this.handleChange} title="Peso Liquido" width="6"  tabindex="6" mask={$maskdefinitions.numeric}/>
							<TextInput id="pesoBruto" onBlur={this.handleChange} title="Peso Bruto" width="6"  tabindex="7" mask={$maskdefinitions.numeric}/>
						</div>
						<div className="row">
							<TextInput id="observacao" onBlur={this.handleChange} title="Observação" tooltip="Observação" width="12" maxLength={500} tabindex="8" />
						</div>

						<div className="row">
                            <SuggestionInput id="categoria" restService={new GenericService("/categoria")} projection={this.projectionStandard} title="Categoria do Produto" width="6"  onSelected={this.handleSelect} placeholder="Digitar categoria" tabindex="9"/>
                            <SuggestionInput id="fornecedor" restService={new GenericService("/customer/fornecedor")} projection={this.projectionFornecedor} title="Fornecedor do produto" width="6"  onSelected={this.handleSelect} placeholder="Digitar fornecedor" tabindex="10"/>
						</div>
						<div className="row">
							<SuggestionInput id="unidade" restService={new GenericService("/unidade")} projection={this.projectionStandard} title="Unidade do produto" width="6"  onSelected={this.handleSelect} placeholder="Digitar unidade" tabindex="11"/>
							<SuggestionInput id="ncm" restService={new GenericService("/ncm")} projection={this.projectionNcm} title="NCM do produto" width="6"  onSelected={this.handleSelect} placeholder="Digitar NCM" tabindex="12"/>
						</div>

						<div className="row">
							<DropDownRest id="origemProduto" restservice={new GenericService("/origemProduto")} onChange={this.handleOrigemProdutoChange} descriptor="name" title="Origem do Produto" tooltipDescriptor="descricao" width="6" tabindex="13" />
							<TextInput id="exTipi" onBlur={this.handleChange} title="Código IPI" tooltip="Código da Exceção da tabela do IPI" width="2"  tabindex="14" mask={$maskdefinitions.exipi}/>
						</div>

						<Array label="Adicionar Regra ICMS" maxItems={10}>
							<RegraTributariaIcmsField id="regra-icms" onChange={this.onIcmsChange}/>
						</Array>

						<Array label="Adicionar Regra IPI" maxItems={2}>
							<RegraTributariaIpiField id="regra-ipi" onChange={this.onIpiChange}/>
						</Array>

						<Array label="Adicionar Regra PIS" maxItems={1}>
							<RegraTributariaPisCofinsField type="PIS" id="regra-pis" onChange={this.onPisChange}/>
						</Array>

						<Array label="Adicionar Regra COFINS" maxItems={1}>
							<RegraTributariaPisCofinsField type="COFINS" id="regra-cofins" onChange={this.onCofinsChange}/>
						</Array>

						<Array label="Adicionar Informações NFe" maxItems={1}>
							<RegraTributariaInfoField  id="regra-infonfe" onChange={this.onInfoNfeChange}/>
						</Array>

					</div>

				);
			}
		});
	});



