define(['react',
		'common/event',
		'common/messagehandler',
		'restservice/generic.service',
		'component/email.input',
		'component/text.input',
		'component/text.area',
		'component/dropdown',
		'component/address.field',
		'component/contact.field',
		'component/dropdown.rest',
		'component/checkbox.input',
		'component/array',
		'jquery',
		'jqueryMask',
		'common/maskdefinitions'

	],

	function (React, $event, $messageHandler, GenericService, EmailInput, TextInput, TextArea, DropDown, AddressField, ContactField, DropDownRest, CheckboxInput, Array, $jquery, ___mask, $maskdefinitions) {

		function toFirstUppercase(str){
		    return 	str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
		};

		function getInitialModel(tipo) {
			return {
				tipoCustomer: tipo,
				tipoPessoa: 'FISICA',
				lojaOrigem: null
			};
		};

		return React.createClass({

			propTypes : {
				tipoCustomer : React.PropTypes.string.isRequired
			},

			_internalModel: null,

			getInitialState: function () {
				this._internalModel = getInitialModel(this.props.tipoCustomer);
				return {
					model: this._internalModel
				};
			},

			componentDidMount: function () {
				$event.addListener('save', this.saveData);
			},
			componentWillUnmount: function () {
				$event.removeListener('save', this.saveData);
			},

			saveData: function (formElement) {
				var service = new GenericService('/customer');

				service.create(this._internalModel).then(function () {
					$event.emitEvent('update-list');
					this.reset(formElement);
					$messageHandler.showSuccess(toFirstUppercase(this.props.tipoCustomer) + " criado com sucesso");
				}.bind(this));
			},

			reset: function (formElement) {
				this._internalModel = getInitialModel(this.props.tipoCustomer);
				this.setState({model: this._internalModel});
				formElement.getDOMNode().reset();
			},

			handleChange: function (event) {
				this._internalModel[event.target.id] = $jquery(event.target).val(); // auto unmask
				this.setState({model: this._internalModel});
			},

			handleLojaChange: function (event) {
				this._internalModel.lojaOrigem.codigo = event.target.selectedOptions[0].value;
				this.setState({model: this._internalModel});
			},

			handleContactChange: function (contactModel) {
				this._internalModel.contato = contactModel;
				this.setState({model: this._internalModel});
			},

			handleAddressChange : function(addressModel){
				this._internalModel.enderecos = addressModel;
				this.setState({model: this._internalModel});
			},


			render: function () {

				var tipoPessoaOptions = [{value: 'FISICA', text: 'Física'}, {value: 'JURIDICA', text: 'Jurídica'}];

				var isPessoaFisica = this.state.model.tipoPessoa === 'FISICA';

				var im = isPessoaFisica ? null : <TextInput id="im" onChange={this.handleChange} title="Inscrição Municipal (IM)" width="6" mask={$maskdefinitions.integer}/>;
				var suframa = isPessoaFisica ? null : <TextInput id="suframa" onChange={this.handleChange} title="Inscrição Suframa" width="6" mask={$maskdefinitions.integer}/>;
					var isentoIcms = isPessoaFisica ? null :
						<CheckboxInput id="isentoIcms" type="checkbox" onChange={this.handleChange} title="Isento ICMS" tooltip="É isento de ICMS?"  width="6" checked={false}/>;
					var ehSimples = isPessoaFisica ? null :
						<CheckboxInput id="ehSimples" type="checkbox" onChange={this.handleChange} title="Empresa Simples" tooltip="Empresa é simples nacional?"  width="6" checked={true}/>;
				return (

					<div>
						<div className="row">
							<DropDown id="tipoPessoa" onChange={this.handleChange} title="Tipo de Pessoa" options={tipoPessoaOptions} width="6"/>
							<TextInput id="cpfCnpj" onBlur={this.handleChange} title={isPessoaFisica ? 'CPF' : 'CNPJ'} width="6" mask={isPessoaFisica ? $maskdefinitions.cpf : $maskdefinitions.cnpj}/>
						</div>
						<div className="row">
							<TextInput id="rgIe" onBlur={this.handleChange} title={isPessoaFisica ? 'RG' : 'IE'} width="6"/>
						{im}
						</div>
						<div className="row" >
						{suframa}
						</div>
						<div className="row" >
						{isentoIcms}
						{ehSimples}
						</div>
						<div className="row">
							<TextInput id="razaoSocial" onBlur={this.handleChange} title={isPessoaFisica ? 'Nome' : 'Razão Social'} width="12" required={true} maxLength={100}/>
						</div>
						<div className="row">
							<TextInput id="fantasia" onBlur={this.handleChange} title={isPessoaFisica ? 'Apelido' : 'Nome Fantasia'} width="12" maxLength={100}/>
						</div>
						<div className="row">
							<EmailInput id="email" onBlur={this.handleChange} title='E-Mail' width="12"/>
						</div>
						<div className="row">
							<TextInput id="fone" onBlur={this.handleChange} title='Telefone Fixo' width="6" mask={$maskdefinitions.phone}/>
							<TextInput id="celular" onBlur={this.handleChange} title='Celular' width="6" mask={$maskdefinitions.cellphone}/>
						</div>
						<div className="row">
							<DropDownRest id="lojaOrigem" restservice={new GenericService("/loja")} onChange={this.handleLojaChange} descriptor="fantasia" title="Loja de Origem" width="12"  />
						</div>
						<div className="row">
							<TextArea id="obs" onBlur={this.handleChange} title='Observação' maxLength={2048}/>
						</div>

						<Array label="Adicionar Endereço">
							<AddressField id="editor-address" onChange={this.handleAddressChange}/>
						</Array>

						<Array  label="Adicionar Contato">
							<ContactField id="editor-contact" onChange={this.handleContactChange}/>
						</Array>
					</div>
				);
			}
		});
	});




