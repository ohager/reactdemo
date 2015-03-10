define(['react',
		'common/event',
		'common/validators',
		'jquery',
		'jqueryMask',
		'common/maskdefinitions',
		'restservice/generic.service',
		'component/details/detail.item',
		'component/details/detail.section',
		'component/mixins/mixin.arrayfield'

	],
	function (React, $event, $validators, jquery, __mask, $maskdefinitions, GenericService, DetailItem, DetailSection, ArrayField) {

		/*
		 codigo: 3,
		 tipoEndereco: "RESIDENCIAL",
		 cep: "13.060-367",
		 tipoLogradouro: "Rua",
		 endereco: "Ézio Wagner da Silva",
		 numero: "114",
		 complemento: "",
		 bairro: "Residencial Parque da F",
		 pais:  1058,
		 municipio:  3509502,
		 estado:  35,

		 */

		var DetailSectionAddress = React.createClass({

			mixins : [ArrayField],

			_internalAddress: null,
			_isAddressValid: false,

			propTypes: {
				address: React.PropTypes.object,
				onAddressChange: React.PropTypes.func.isRequired
			},

			initializeAddress: function (address) {
				this.state.model = address;
				if (!this.state.model) {
					this.state.model = {
						tipoEndereco: "RESIDENCIAL",
						cep: "",
						tipoLogradouro: "",
						endereco: "",
						numero: "",
						complemento: "",
						bairro: "",
						pais: 1058, // Brasil
						municipio: {
							estado : {
							}
						}
					}
				}
			},


			getInitialState: function () {
				return {estados: [], municipios: [], model: null};
			},


			componentWillMount: function () {

				this.initializeAddress(this.props.address);

				var estadoService = new GenericService('/estado');
				estadoService.getAll().then(function (estados) {


					var siglas = estados.map(function (estado) {
						return {value: estado.codigo, text: estado.sigla};
					});

					this.setState({estados: [{value:0,text:'--'}].concat(siglas)});

					// TODO: this is due of inconsistency!
					if (typeof(this.state.model.municipio.estado) !== 'object') {
						this.loadMunicipios(this.state.model.municipio.estado);
					}

				}.bind(this));
			},

			componentWillReceiveProps: function (nextProps) {
				this.initializeAddress(nextProps.address);
			},

			loadMunicipios: function (idEstado) {
				var municipioService = new GenericService('/estado/' + idEstado + '/municipios');
				municipioService.getAll().then(function (municipios) {
					var municipioOptions = municipios.map(function (municipio) {
						return {value: municipio.codigo, text: municipio.descricao};
					});
					this.setState({municipios: municipioOptions});
				}.bind(this));
			},

			getValueFromTarget: function (target) {
				return jquery(target).val(); // unmask
			},

			isValidAddress: function () {
				return $validators.test.cep(this.state.model.cep) &&
					$validators.test.nonEmpty(this.state.model.endereco) &&
					$validators.test.nonEmpty(this.state.model.municipio.codigo) &&
					$validators.test.nonEmpty(this.state.model.municipio.estado);
			},

			changedBasic: function (event) {

				var property = this.extractNameFromId(event.target.id).replace('-input', ''); //event.target.id.replace('-input', '');
				var oldValue = this.state.model[property];
				var newValue = this.getValueFromTarget(event.target);

				this.state.model[property] = newValue;
				var isValid = this.isValidAddress();

				if (isValid && oldValue === newValue) {
					$event.emitEvent('editor-closed');
				}

				if (isValid && oldValue !== newValue) {
					this.props.onAddressChange(this.state.model);
				}
			},

			changedEstado: function (event) {
				var selectedEstado = event.target.selectedOptions[0].value;
				if(selectedEstado == 0 ){ // attention: could be string!
					this.setState({municipios:[]});
					return;
				}
				this.state.model.municipio.estado.codigo = selectedEstado;
				this.loadMunicipios(selectedEstado);
			},

			changedMunicipio: function (event) {

				this.state.model.municipio.codigo = event.target.selectedOptions[0].value;
				if (this.isValidAddress()) {
					this.props.onAddressChange(this.state.model);
				}
			},

			createMunicipioEditor: function () {

				try {
					var estadoPreselect = !this.state.model.municipio.estado ? '' : this.state.model.municipio.estado;
					var municipioPreselect = !this.state.model.municipio.codigo? '' : this.state.model.municipio.codigo;
					var estadoOptions = this.state.estados.map(function (option, index) {
						return <option key={index} value={option.value}>{option.text}</option>
					}.bind(this));
					var municipioOptions = this.state.municipios.map(function (option, index) {
						return <option key={index} value={option.value}>{option.text}</option>
					}.bind(this));
				}catch(e){
					console.error(e);
				}
				return (
					<div className="row">
                         <div className="col-xs-3 col-xm-3">
						  <select id={this.createId("estado-input")} className="form-control"  onChange={this.changedEstado} defaultValue={estadoPreselect}>
                          { estadoOptions }
						  </select>
                        </div>
                      <div className="col-xs-9 col-xm-9">
						  <select id={this.createId("municipio-input")} className="form-control"  onChange={this.changedMunicipio} defaultValue={municipioPreselect}>
                          { municipioOptions }
						</select>
                      </div>
					</div>
				);
			},

			findEstado : function(codigo){
				// I wish I had ECMA6 array.protoype.find :(
				for(var i = 0; i < this.state.municipios.length; ++i){
					var municipio = this.state.municipios[i];
					if(municipio.value === codigo){
						return municipio.text;
					}
				}
				return '';
			},

			findMunicipio : function(codigo){
				// I wish I had ECMA6 array.protoype.find :(
				for(var i = 0; i < this.state.estados.length; ++i){
					var estado = this.state.estados[i];
					if(estado.value === codigo){
						return estado.text;
					}
				}
				return '';
			},

			createMunicipioDescription : function(){
				return this.findEstado(this.state.model.municipio.codigo) + ', ' +  this.findMunicipio(this.state.model.municipio.estado);
			},

			keyPressed: function (event) {

				if (event.charCode === 13) {
					event.preventDefault();
					event.target.blur();
				}
			},

			render: function () {
				try {
					var tipoEndereco = <select id={this.createId("tipoEndereco-input")} className="form-control"  onBlur={this.changedBasic} defaultValue={this.state.model.tipoEndereco} >
						<option key={0} value='RESIDENCIAL'>Residêncial</option>
						<option key={1} value='COMERCIAL'>Comercial</option>
					</select>;
					var cep = <input id={this.createId("cep-input")} type="text" className="form-control" onBlur={this.changedBasic} onKeyUp={$validators.validateCep} onKeyPress={this.keyPressed} defaultValue={this.state.model.cep}></input>;
					var tipoLogradouro = <input id={this.createId("tipoLogradouro-input")} type="text" className="form-control"  onKeyPress={this.keyPressed} onBlur={this.changedBasic} defaultValue={this.state.model.tipoLogradouro}></input>;
					var endereco = <input id={this.createId("endereco-input")} type="text" className="form-control"  onBlur={this.changedBasic} onKeyPress={this.keyPressed} onKeyUp={$validators.validateNonEmpty} defaultValue={this.state.model.endereco}></input>;
					var numero = <input id={this.createId("numero-input")} type="text" className="form-control"  onKeyPress={this.keyPressed} onBlur={this.changedBasic}  defaultValue={this.state.model.numero}></input>;
					var complemento = <input id={this.createId("complemento-input")} type="text" className="form-control"  onKeyPress={this.keyPressed} onBlur={this.changedBasic} defaultValue={this.state.model.complemento}></input>;
					var bairro = <input id={this.createId("bairro-input")} type="text" className="form-control"  onKeyPress={this.keyPressed} onBlur={this.changedBasic} defaultValue={this.state.model.bairro}></input>;
					var municipio = this.createMunicipioEditor();
					var municipioDescricao = this.createMunicipioDescription();
				}catch(e){
					console.error(e);
				}
				return (
					<DetailSection id={this.props.id} title="Endereço">
						<DetailItem editorRef={this.createId("#tipoEndereco-input")} label='Tipo Endereço' editor={tipoEndereco} value={this.state.model.tipoEndereco} />
						<DetailItem editorRef={this.createId("#cep-input")} label='CEP' editor={cep} value={this.state.model.cep} mask={$maskdefinitions.cep} required={true}/>
						<DetailItem editorRef={this.createId("#tipoLogradouro-input")} label='Tipo Logradouro' editor={tipoLogradouro} value={this.state.model.tipoLogradouro}/>
						<DetailItem editorRef={this.createId("#endereco-input")} label='Endereço' editor={endereco} value={this.state.model.endereco} required={true}/>
						<DetailItem editorRef={this.createId("#numero-input")} label='Número' editor={numero} value={this.state.model.numero}/>
						<DetailItem editorRef={this.createId("#complemento-input")} label='Complemento' editor={complemento} value={this.state.model.complemento}/>
						<DetailItem editorRef={this.createId("#bairro-input")} label='Bairro' editor={bairro} value={this.state.model.bairro} />
						<DetailItem editorRef={this.createId("#municipio-input")} label='Estado e Município' editor={municipio} value={municipioDescricao} required={true}/>
					</DetailSection>
				);
			}

		});

		return DetailSectionAddress;
	});

