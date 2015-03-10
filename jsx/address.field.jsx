define(['react',
		'q',
		'restservice/generic.service',
		'component/accordion',
		'component/dropdown',
		'component/text.input',
		'component/cep.input',
		'jquery',
		'jqueryMask',
		'common/maskdefinitions',
		'component/mixins/mixin.arrayfield'
	],
	function (React, $q, GenericService, Accordion, DropDown, TextInput, CepInput, $jquery, __mask, $maskdefinitions, MixinArrayField) {


	return React.createClass({

		mixins : [MixinArrayField],

		_defaultOptionMunicipio: {value: 0, text: '- Selecionar um estado -'},

		propTypes: {
			id : React.PropTypes.string.isRequired,
			onChange: React.PropTypes.func.isRequired
		},

		getInitialState: function () {
			return {estados: [],
				municipios: [this._defaultOptionMunicipio],
				isExpanded : false,
				address : {
					pais: {
						codigo: 1058 // Brasil
					},
					municipio: {}
				}}
		},

		componentDidMount: function () {
			var estadoService = new GenericService('/estado');
			estadoService.getAll().then(function (estados) {

				var siglas = [{value: 0, text: '--'}].concat(estados.map(function (estado) {
					return {value: estado.codigo, text: estado.sigla};
				}));
				this.setState({estados: siglas});
			}.bind(this));
		},


		loadMunicipios: function (idEstado, onReady) {
			var deferred = $q.defer();
			var municipioService = new GenericService('/estado/' + idEstado + '/municipios');
			municipioService.getAll().then(function (municipios) {
				var municipioOptions = municipios.map(function (municipio) {
					return {value: municipio.codigo, text: municipio.descricao};
				});
				deferred.resolve();
				this.setState({municipios: municipioOptions});
			}.bind(this))
			.catch(deferred.reject);

			return deferred.promise;
		},

		estadoChanged: function (event) {
			var idEstado = event.target.value;

			if (idEstado == 0) {
				this.setState({municipios: [this._defaultOptionMunicipio]});
				return;
			}

			this.loadMunicipios(idEstado);
		},

		notifyAddressChanged : function(){
			this.props.onChange(this.state.address, this.props.id);
		},

		addressChanged: function (event) {

			var property = this.extractNameFromId(event.target.id);
			if (property === 'municipio') {
				this.state.address.municipio.codigo = event.target.selectedOptions[0].value;
			}
			else {
				this.state.address[property] = $jquery(event.target).val(); // unmask
			}

			this.notifyAddressChanged();
		},

		cepLoaded : function(address){

			if(!address){
				return;
			}

			var idTipoLogradouro = '#' + this.createId('tipoLogradouro');
			var idEndereco = '#' + this.createId('endereco');
			var idBairro = '#' + this.createId('bairro');
			var idSigla = '#' + this.createId('sigla_estado');
			var idMunicipio = '#' + this.createId('municipio');

			$jquery(idTipoLogradouro).val(address.tipoLogradouro);
			$jquery(idEndereco).val(address.endereco);
			$jquery(idBairro).val(address.bairro);
			$jquery(idSigla).val(address.municipio.estado.codigo);

			this.loadMunicipios(address.municipio.estado.codigo).then(function(){
				$jquery(idMunicipio).val(address.municipio.codigo);
			});

			this.setState({municipios : [{value: address.municipio.codigo, text: address.municipio.descricao}],
			address : address
			});

			this.notifyAddressChanged();
		},

		render: function () {

			var tipoEnderecoOptions = [
				{value: 'residencial', text: 'Residencial'},
				{value: 'comercial',text: 'Comercial'}

			];

			return (
				<Accordion id={this.createId("address")} title="Endereço" >
					<div className="row">
						<DropDown id={this.createId("tipoEndereco")} onChange={this.addressChanged} title="Tipo de Endereço" options={tipoEnderecoOptions} width="12"/>
					</div>
					<div className="row">
						<CepInput id={this.createId("cep")} onBlur={this.addressChanged} onCep={this.cepLoaded} title="CEP" placeholder="12.345-678" width="4" required={this.state.isExpanded} />
					</div>
					<div className="row">
						<TextInput type="text" id={this.createId("tipoLogradouro")} onBlur={this.addressChanged} title="Logradouro" width="4" />
					</div>
					<div className="row">
						<TextInput id={this.createId("endereco")} onBlur={this.addressChanged} required={this.state.isExpanded} title="Endereço" width="9"/>
						<TextInput id={this.createId("numero")} onBlur={this.addressChanged} title="N°" width="3"/>
					</div >
					<div className="row">
						<TextInput id={this.createId("complemento")} onBlur={this.addressChanged} title="Complemento" width="12"/>
					</div>
					<div className="row">
						<TextInput id={this.createId("bairro")} onBlur={this.addressChanged} title="Bairro" width="12"/>
					</div>
					<div className="row">
						<DropDown ref="estadoDropdown" id={this.createId("sigla_estado")} onChange={this.estadoChanged} title="Estado" width="3" options={this.state.estados}/>
						<DropDown id={this.createId("municipio")} onChange={this.addressChanged} title="Município" width="9" options={this.state.municipios}/>
					</div>
				</Accordion>
			)
		}
	});

});

