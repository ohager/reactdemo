define(['react',
		'common/event',
		'common/messagehandler',
		'restservice/generic.service',
		'component/email.input',
		'component/text.input',
		'component/text.area',
		'component/dropdown',
		'component/address.field',
		'component/checkbox.input',
		'component/array',
		'jquery',
		'jqueryMask',
		'common/maskdefinitions'

	],

	function (React, $event, $messageHandler, GenericService, EmailInput, TextInput, TextArea, DropDown, AddressField, CheckboxInput, Array, $jquery, ___mask, $maskdefinitions) {

		function getInitialModel() {
			return {
                "endereco": {},
                "lojaCertificado": {}
            }
		};

		return React.createClass({

			propTypes : {
				
			},
            
			getInitialState: function () {

				return {
					model: getInitialModel()
				};
			},

			componentDidMount: function () {
				$event.addListener('save', this.saveData);
			},
			componentWillUnmount: function () {
				$event.removeListener('save', this.saveData);
			},

			saveData: function (formElement) {
				var service = new GenericService('/loja');

				service.create(this.state.model).then(function () {
					$event.emitEvent('update-list');
					this.reset(formElement);
					$messageHandler.showSuccess( "Loja criada com sucesso");
				}.bind(this));
			},

			reset: function (formElement) {				
				this.setState({model: getInitialModel()});
				formElement.getDOMNode().reset();
			},

			handleChange: function (event) {
				this.state.model[event.target.id] = $jquery(event.target).val(); // auto unmask
			},

			handleAddressChange : function(addressModel){
                this.state.model.enderecos = addressModel;
			},


			render: function () {								

				return (
					<div>
						<div className="row">							
							<TextInput id="cnpj" onBlur={this.handleChange} title={'CNPJ'} width="6" mask={ $maskdefinitions.cnpj}/>
                            <TextInput id="ie" onBlur={this.handleChange} title={'IE'} width="6"/>
						</div>
						<div className="row">
                            <TextInput id="im" onBlur={this.handleChange} title="Inscrição Municipal (IM)" width="6" mask={$maskdefinitions.integer}/>
                            <TextInput id="suframa" onBlur={this.handleChange} title="Inscrição Suframa" width="6" mask={$maskdefinitions.integer}/>
						</div>
						<div className="row" >
                            <CheckboxInput id="isentoIcms" type="checkbox" onChange={this.handleChange} title="Isento ICMS" tooltip="É isento de ICMS?"  width="6" checked={false}/>
                            <CheckboxInput id="ehSimples" type="checkbox" onChange={this.handleChange} title="Empresa Simples" tooltip="Empresa é simples nacional?"  width="6" checked={true}/>
						</div>
						<div className="row">
							<TextInput id="razaoSocial" onBlur={this.handleChange} title={'Razão Social'} width="12" required={true} maxLength={100}/>
						</div>
						<div className="row">
							<TextInput id="fantasia" onBlur={this.handleChange} title={'Nome Fantasia'} width="12" maxLength={100}/>
						</div>
						<div className="row">
							<EmailInput id="email" onBlur={this.handleChange} title='E-Mail' width="12"/>
						</div>
						<div className="row">
							<TextInput id="fone" onBlur={this.handleChange} title='Telefone Fixo' width="6" mask={$maskdefinitions.phone}/>
							<TextInput id="celular" onBlur={this.handleChange} title='Celular' width="6" mask={$maskdefinitions.cellphone}/>
						</div>

                        <div className="row" >
						    <AddressField id="editor-address" onChange={this.handleAddressChange}/>
                        </div>

					</div>
				);
			}
		});
	});




